package services_tests

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/controllers"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type mockClaimsService struct {
	mock.Mock
}

func (m *mockClaimsService) GetClaimsByUserId(userID *string) (*models.Claims, error) {
	args := m.Called(userID)
	return args.Get(0).(*models.Claims), args.Error(1)
}

func TestGetClaimsByUserId(t *testing.T) {
	// Mock service and setup expected values
	mockService := new(mockClaimsService)
	accidentDate := time.Date(2024, time.March, 24, 0, 0, 0, 0, time.UTC)
	expectedUserID := "user1"
	expectedClaim := &models.Claims{
		ID:               primitive.NewObjectID(),
		User_id:          expectedUserID,
		Accident_date:    accidentDate,
		Parties_involved: pointerString("John Doe"),
		Liability:        pointerString("Liability Value"),
		Claims_made:      true,
		No_claims_bonus:  pointerString("No Claims Bonus"),
	}

	// Mock the GetClaimsByUserId method to return the expected claim
	mockService.On("GetClaimsByUserId", mock.Anything).Return(expectedClaim, nil)

	// Create a mock HTTP request
	req, _ := http.NewRequest("GET", "/claims/get/user/user1", nil)
	w := httptest.NewRecorder()

	// Create a Gin engine instance and register the controller
	router := gin.Default()
	controller := controllers.NewClaim(mockService)
	controller.RegisterClaimsRoutes(router.Group(""))

	// Perform the request
	router.ServeHTTP(w, req)

	// Verify the response
	assert.Equal(t, http.StatusOK, w.Code)

	// Decode the response body and verify its content
	var responseClaim models.Claims
	err := json.Unmarshal(w.Body.Bytes(), &responseClaim)
	assert.NoError(t, err)
	assert.Equal(t, expectedClaim, &responseClaim)
}
