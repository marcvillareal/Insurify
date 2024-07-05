package integration_tests

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/controllers"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// pointerString initializes the string pointer
func pointerString(s string) *string {
	return &s
}

// Define mockUserService type
type mockUserService struct {
	mock.Mock
}

// Define GetUser method for mockUserService
func (m *mockUserService) GetUser(userID *string) (*models.User, error) {
	args := m.Called(userID)
	return args.Get(0).(*models.User), args.Error(1)
}

// Define UpdateUser method for mockUserService
func (m *mockUserService) UpdateUser(user *models.User) error {
	args := m.Called(user)
	return args.Error(0)
}

// InitializeTestUserDatabase initializes the test database with test data
func InitializeTestUserDatabase() error {
	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		log.Fatal("MONGODB_URI not found in environment variables")
		return errors.New("MONGODB_URI not found in environment variables")
	}

	clientOptions := options.Client().ApplyURI(mongoURI)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
		return err
	}
	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			log.Fatal("Failed to disconnect from MongoDB:", err)
		}
	}()

	dbName := "Insurify_Test"
	collection := "User"
	db := client.Database(dbName)
	users := db.Collection(collection)

	count, err := users.CountDocuments(ctx, bson.D{})
	if err != nil {
		log.Fatal("Failed to count documents in MongoDB:", err)
		return err
	}

	if count == 0 {
		usersData := []interface{}{
			models.User{
				ID:         primitive.NewObjectID(),
				User_id:    "1",
				First_name: pointerString("John"),
				Last_name:  pointerString("Doe"),
				Password:   pointerString("password"),
				Email:      pointerString("john.doe@example.com"),
				Phone:      pointerString("1234567890"),
			},
			models.User{
				ID:         primitive.NewObjectID(),
				User_id:    "2",
				First_name: pointerString("Jane"),
				Last_name:  pointerString("Smith"),
				Password:   pointerString("password"),
				Email:      pointerString("jane.smith@example.com"),
				Phone:      pointerString("9876543210"),
			},
			// Add more test data as needed
		}

		_, err := users.InsertMany(ctx, usersData)
		if err != nil {
			log.Fatal("Failed to insert test data into MongoDB:", err)
			return err
		}

		log.Println("Test data inserted into MongoDB successfully")
	} else {
		log.Println("Test data already exists in MongoDB, skipping insertion")
	}

	return nil
}

func TestGetUser(t *testing.T) {
	err := InitializeTestUserDatabase()
	assert.NoError(t, err)

	router := gin.Default()
	mockService := new(mockUserService)

	// Set up expected behavior for the GetUser method
	expectedUser := &models.User{
		ID:         primitive.NewObjectID(),
		User_id:    "1",
		First_name: pointerString("John"),
		Last_name:  pointerString("Doe"),
	}
	mockService.On("GetUser", mock.Anything).Return(expectedUser, nil)

	controller := controllers.New(mockService)
	controller.RegisterUserRoutes(router.Group(""))

	req, _ := http.NewRequest("GET", "/user/get/1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var responseUser models.User
	err = json.Unmarshal(w.Body.Bytes(), &responseUser)
	assert.NoError(t, err)

	// Now assert that the response matches the expected user
	assert.Equal(t, expectedUser, &responseUser)
}
