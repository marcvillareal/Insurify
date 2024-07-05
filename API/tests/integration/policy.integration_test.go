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

// Define mockPolicyService type
type mockPolicyService struct {
	mock.Mock
}

// Define GetPolicyByUserId method for mockPolicyService
func (m *mockPolicyService) GetPolicyByUserId(userID *string) (*models.Policy, error) {
	args := m.Called(userID)
	return args.Get(0).(*models.Policy), args.Error(1)
}

// Define ServePDFByUserId method for mockPolicyService
func (m *mockPolicyService) ServePDFByUserId(userID *string) ([]byte, error) {
	args := m.Called(userID)
	return args.Get(0).([]byte), args.Error(1)
}

// InitializeTestPolicyDatabase initializes the test database with test data
func InitializeTestPolicyDatabase() error {
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
	collection := "Policy"
	db := client.Database(dbName)
	policies := db.Collection(collection)

	count, err := policies.CountDocuments(ctx, bson.D{})
	if err != nil {
		log.Fatal("Failed to count documents in MongoDB:", err)
		return err
	}

	if count == 0 {
		policiesData := []interface{}{
			models.Policy{
				ID:         primitive.NewObjectID(),
				User_id:    "1",
				First_name: pointerString("John"),
				Last_name:  pointerString("Doe"),
				Product: models.Product{
					Description: pointerString("Product 1 description"),
					Type:        pointerString("Product 1 type"),
					Discount:    pointerString("Product 1 discount"),
				},
				Premium:    pointerString("100"),
				Start_date: time.Now(),
				End_date:   time.Now().AddDate(1, 0, 0), // Add 1 year to start date
			},
			models.Policy{
				ID:         primitive.NewObjectID(),
				User_id:    "2",
				First_name: pointerString("Jane"),
				Last_name:  pointerString("Smith"),
				Product: models.Product{
					Description: pointerString("Product 2 description"),
					Type:        pointerString("Product 2 type"),
					Discount:    pointerString("Product 2 discount"),
				},
				Premium:    pointerString("150"),
				Start_date: time.Now(),
				End_date:   time.Now().AddDate(1, 0, 0), // Add 1 year to start date
			},
			// Add more test data as needed
		}

		_, err := policies.InsertMany(ctx, policiesData)
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

func TestGetPolicyByUserId(t *testing.T) {
	err := InitializeTestPolicyDatabase()
	assert.NoError(t, err)

	router := gin.Default()
	mockService := new(mockPolicyService)

	// Set up expected behavior for the GetPolicyByUserId method
	expectedPolicy := &models.Policy{
		ID:         primitive.NewObjectID(),
		User_id:    "1",
		First_name: pointerString("John"),
		Last_name:  pointerString("Doe"),
	}
	mockService.On("GetPolicyByUserId", mock.Anything).Return(expectedPolicy, nil)

	controller := controllers.NewPolicy(mockService)
	controller.RegisterPolicyRoutes(router.Group(""))

	req, _ := http.NewRequest("GET", "/policy/get/user/1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var responsePolicy models.Policy
	err = json.Unmarshal(w.Body.Bytes(), &responsePolicy)
	assert.NoError(t, err)

	// Now assert that the response matches the expected policy
	assert.Equal(t, expectedPolicy, &responsePolicy)
}

func TestGetPDFByUserId(t *testing.T) {
	err := InitializeTestPolicyDatabase()
	assert.NoError(t, err)

	router := gin.Default()
	mockService := new(mockPolicyService)

	// Set up expected behavior for the ServePDFByUserId method
	expectedPDFData := []byte("mock PDF data")
	mockService.On("ServePDFByUserId", mock.Anything).Return(expectedPDFData, nil)

	controller := controllers.NewPolicy(mockService)
	controller.RegisterPolicyRoutes(router.Group(""))

	req, _ := http.NewRequest("GET", "/policy/get/pdf/user/1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "application/pdf", w.Header().Get("Content-Type"))

	assert.Equal(t, expectedPDFData, w.Body.Bytes())
}
