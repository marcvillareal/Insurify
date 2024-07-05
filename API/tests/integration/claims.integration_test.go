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

// Define mockClaimsService type
type mockClaimsService struct {
	mock.Mock
}

// Implement GetClaimsByUserId method for mockClaimsService
func (m *mockClaimsService) GetClaimsByUserId(userID *string) (*models.Claims, error) {
	args := m.Called(userID)
	return args.Get(0).(*models.Claims), args.Error(1)
}

// InitializeTestClaimsDatabase initializes the test database with test data
func InitializeTestClaimsDatabase() error {
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
	collection := "Claims"
	db := client.Database(dbName)
	claims := db.Collection(collection)

	count, err := claims.CountDocuments(ctx, bson.D{})
	if err != nil {
		log.Fatal("Failed to count documents in MongoDB:", err)
		return err
	}

	if count == 0 {
		claimsData := []interface{}{
			models.Claims{
				ID:               primitive.NewObjectID(),
				User_id:          "1",
				Accident_date:    time.Now(),
				Parties_involved: pointerString("John Doe, Jane Smith"),
				Liability:        pointerString("Partial"),
				Claims_made:      true,
				No_claims_bonus:  pointerString("20%"),
			},
			models.Claims{
				ID:               primitive.NewObjectID(),
				User_id:          "2",
				Accident_date:    time.Now(),
				Parties_involved: pointerString("Alice Johnson"),
				Liability:        pointerString("Full"),
				Claims_made:      false,
				No_claims_bonus:  nil,
			},
			// Add more test data as needed
		}

		_, err := claims.InsertMany(ctx, claimsData)
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

// TestGetClaimsByUserId tests the GetClaimsByUserId handler
func TestGetClaimsByUserId(t *testing.T) {
	err := InitializeTestClaimsDatabase()
	assert.NoError(t, err)

	router := gin.Default()
	mockService := new(mockClaimsService)

	// Set up expected behavior for the GetClaimsByUserId method
	expectedClaims := &models.Claims{
		ID:               primitive.NewObjectID(),
		User_id:          "1",
		Accident_date:    time.Now(),
		Parties_involved: pointerString("John Doe, Jane Smith"),
		Liability:        pointerString("Partial"),
		Claims_made:      true,
		No_claims_bonus:  pointerString("20%"),
	}
	mockService.On("GetClaimsByUserId", mock.Anything).Return(expectedClaims, nil)

	controller := controllers.NewClaim(mockService)
	controller.RegisterClaimsRoutes(router.Group(""))

	req, _ := http.NewRequest("GET", "/claims/get/user/1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var responseClaims models.Claims
	err = json.Unmarshal(w.Body.Bytes(), &responseClaims)
	assert.NoError(t, err)

	// assert that the response matches the expected claims
	assert.Equal(t, expectedClaims.ID, responseClaims.ID)
	assert.Equal(t, expectedClaims.User_id, responseClaims.User_id)
	assert.Equal(t, expectedClaims.Parties_involved, responseClaims.Parties_involved)
	assert.Equal(t, expectedClaims.Liability, responseClaims.Liability)
	assert.Equal(t, expectedClaims.Claims_made, responseClaims.Claims_made)
	assert.Equal(t, expectedClaims.No_claims_bonus, responseClaims.No_claims_bonus)
	assert.WithinDuration(t, expectedClaims.Accident_date, responseClaims.Accident_date, time.Second) // Compare without time zone
}
