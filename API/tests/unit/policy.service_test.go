package services_tests

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/controllers"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type mockPolicyService struct {
	mock.Mock
}

func (m *mockPolicyService) GetPolicyByUserId(userID *string) (*models.Policy, error) {
	args := m.Called(userID)
	return args.Get(0).(*models.Policy), args.Error(1)
}

func (m *mockPolicyService) ServePDFByUserId(userID *string) ([]byte, error) {
	args := m.Called(userID)
	return args.Get(0).([]byte), args.Error(1)
}

func TestGetPolicyByUserId(t *testing.T) {
	mockService := new(mockPolicyService)

	// Setup expected values
	expectedUserID := "1"
	expectedPolicy := &models.Policy{
		ID:         primitive.NewObjectID(),
		User_id:    expectedUserID,
		First_name: stringPointer("John"),
		Last_name:  stringPointer("Doe"),
		Premium:    stringPointer("Premium Value"),
	}

	// Mock the GetPolicyByUserId method to return the expected policy
	mockService.On("GetPolicyByUserId", mock.Anything).Return(expectedPolicy, nil)

	// Create a mock HTTP request
	req, _ := http.NewRequest("GET", "/policy/get/user/1", nil)
	w := httptest.NewRecorder()

	// Create a Gin engine instance and register the controller
	router := gin.Default()
	controller := controllers.NewPolicy(mockService)
	controller.RegisterPolicyRoutes(router.Group(""))

	// Perform the request
	router.ServeHTTP(w, req)

	// Verify the response
	assert.Equal(t, http.StatusOK, w.Code)

	// Decode the response body and verify its content
	var responsePolicy models.Policy
	err := json.Unmarshal(w.Body.Bytes(), &responsePolicy)
	assert.NoError(t, err)
	assert.Equal(t, expectedPolicy, &responsePolicy)
}

func TestServePDFByUserId(t *testing.T) {
	mockService := new(mockPolicyService)

	// Setup expected values
	expectedPDF := []byte("PDF Content")

	// Mock the ServePDFByUserId method to return the expected PDF content
	mockService.On("ServePDFByUserId", mock.Anything).Return(expectedPDF, nil)

	// Create a mock HTTP request
	req, _ := http.NewRequest("GET", "/policy/get/pdf/user/1", nil) // Adjust the URL to match the route
	w := httptest.NewRecorder()

	// Create a Gin engine instance and register the controller
	router := gin.Default()
	controller := controllers.NewPolicy(mockService)
	controller.RegisterPolicyRoutes(router.Group(""))

	// Perform the request
	router.ServeHTTP(w, req)

	// Verify the response status code
	assert.Equal(t, http.StatusOK, w.Code)

	// Verify the response body content
	assert.Equal(t, expectedPDF, w.Body.Bytes())
}

func stringPointer(s string) *string {
	return &s
}
