package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"

	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/authentication/middleware"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/authentication/routes"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/controllers"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/services"
)

var (
	server      *gin.Engine
	mongoclient *mongo.Client
	ctx         context.Context
	err         error
	collection  *mongo.Collection

	// User
	userservice    services.UserService
	usercontroller controllers.UserController
	// Policy
	policyservice    services.PolicyService
	policycontroller controllers.PolicyController
	// Metrics
	metricservice     services.MetricsService
	metricscontroller controllers.MetricsController
	// Claims
	claimsservice    services.ClaimsService
	claimscontroller controllers.ClaimsController
)

func init() {
	ctx = context.TODO()

	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	MongoDb := os.Getenv("MONGODB_URI")

	mongoconn := options.Client().ApplyURI(MongoDb)
	connectWithRetry(mongoconn)

	// Initialize services and controllers
	initServicesAndControllers()
}

func connectWithRetry(mongoconn *options.ClientOptions) {
	// Retry connecting to MongoDB with exponential backoff
	const maxRetries = 5
	for attempt := 1; attempt <= maxRetries; attempt++ {
		mongoclient, err = mongo.Connect(ctx, mongoconn)
		if err == nil {
			// Connected successfully
			break
		}
		log.Printf("Failed to connect to MongoDB (attempt %d): %v", attempt, err)
		waitTime := time.Duration(1<<attempt) * time.Second
		time.Sleep(waitTime)
	}
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB after %d attempts", maxRetries)
	}

	// Check if the connection is established
	err = mongoclient.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatalf("Failed to ping MongoDB: %v", err)
	}

	fmt.Println("Mongo Connection Established")
}

func initServicesAndControllers() {
	// Initialize services and controllers
	// Insurify User Collection
	collection = mongoclient.Database("Insurify").Collection("User")
	userservice = services.NewUserService(collection, ctx)
	usercontroller = controllers.New(userservice)

	// Insurify Policy Collection
	collection = mongoclient.Database("Insurify").Collection("Policy")
	policyservice = services.NewPolicyService(collection, ctx)
	policycontroller = controllers.NewPolicy(policyservice)

	// Insurify Metrics Collection
	collection = mongoclient.Database("Insurify").Collection("Metrics")
	metricservice = services.NewMetricService(collection, ctx)
	metricscontroller = controllers.NewMetric(metricservice)

	// Insurify Claims Collection
	collection = mongoclient.Database("Insurify").Collection("Claims")
	claimsservice = services.NewClaimsService(collection, ctx)
	claimscontroller = controllers.NewClaim(claimsservice)

	server = gin.Default()
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	server := gin.Default()

	// Set Gin mode to release
	gin.SetMode(gin.ReleaseMode)

	// Configure CORS middleware with multiple origins
	localFrontend := os.Getenv("LOCAL_FRONTEND_URL")
	deployedFrontend := os.Getenv("DEPLOYED_FRONTEND_URL")
	corsConfig := cors.Config{
		AllowOrigins:     []string{localFrontend, deployedFrontend},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}

	// Apply the CORS middleware to the server
	server.Use(cors.New(corsConfig))

	// Define your routes
	basepath := server.Group("/")
	usercontroller.RegisterUserRoutes(basepath)
	policycontroller.RegisterPolicyRoutes(basepath)
	metricscontroller.RegisterMetricRoutes(basepath)
	claimscontroller.RegisterClaimsRoutes(basepath)

	// Handle OPTIONS requests for CORS preflight
	basepath.OPTIONS("/*any", func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Authorization, Content-Type")
		c.Header("Access-Control-Max-Age", "86400") // 24 hours
		c.AbortWithStatus(http.StatusOK)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Add your routes here
	routes.UserRoutes(server)

	server.Use(middleware.Authentication())

	server.Run(":" + port)
}
