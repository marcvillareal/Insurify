package services_tests

import (
	"bytes"
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

type mockUserService struct {
	mock.Mock
}

func (m *mockUserService) GetUser(id *string) (*models.User, error) {
	args := m.Called(id)
	return args.Get(0).(*models.User), args.Error(1)
}

func (m *mockUserService) UpdateUser(user *models.User) error {
	args := m.Called(user)
	return args.Error(0)
}

func TestGetUser(t *testing.T) {

	// Mock service and setup expected values
	mockService := new(mockUserService)
	expectedUserID := "1"
	// Set a fixed time value for Created_at and Updated_at
	createdAt := time.Date(2023, time.July, 10, 12, 0, 0, 0, time.UTC)
	updatedAt := time.Date(2023, time.July, 12, 14, 0, 0, 0, time.UTC)
	expectedUser := &models.User{
		ID:            primitive.NewObjectID(),
		User_id:       expectedUserID,
		First_name:    pointerString("John"),
		Last_name:     pointerString("Doe"),
		Password:      pointerString("password"),
		Email:         pointerString("john.doe@example.com"),
		Phone:         pointerString("1234567890"),
		Created_at:    createdAt,
		Updated_at:    updatedAt,
		Token:         nil,
		Refresh_token: nil,
	}

	// Mock the GetUser method to return the expected user
	mockService.On("GetUser", mock.Anything).Return(expectedUser, nil)

	// Create a mock HTTP request
	req, _ := http.NewRequest("GET", "/user/get/1", nil)
	w := httptest.NewRecorder()

	// Create a Gin engine instance and register the controller
	router := gin.Default()
	controller := controllers.New(mockService)
	controller.RegisterUserRoutes(router.Group(""))

	// Perform the request
	router.ServeHTTP(w, req)

	// Verify the response
	assert.Equal(t, http.StatusOK, w.Code)

	// Decode the response body and verify its content
	var responseUser models.User
	err := json.Unmarshal(w.Body.Bytes(), &responseUser)
	assert.NoError(t, err)
	assert.Equal(t, expectedUser, &responseUser)
}

func TestUpdateUser(t *testing.T) {
	// Mock service and setup expected values
	mockService := new(mockUserService)
	// Mock the UpdateUser method to return no error
	mockService.On("UpdateUser", mock.Anything).Return(nil)

	// Create a mock HTTP request
	reqBody := []byte(`{"first_name": "UpdatedFirstName", "last_name": "UpdatedLastName"}`)
	req, _ := http.NewRequest("PATCH", "/user/update", bytes.NewBuffer(reqBody))
	w := httptest.NewRecorder()

	// Create a Gin engine instance and register the controller
	router := gin.Default()
	controller := controllers.New(mockService)
	controller.RegisterUserRoutes(router.Group(""))

	// Perform the request
	router.ServeHTTP(w, req)

	// Verify the response
	assert.Equal(t, http.StatusOK, w.Code)

	// Decode the response body and verify its content
	type ResponseBody struct {
		Message string `json:"message"`
	}
	var responseBody ResponseBody
	err := json.Unmarshal(w.Body.Bytes(), &responseBody)
	assert.NoError(t, err)
	assert.Equal(t, "success", responseBody.Message)
}
func pointerString(s string) *string {
	return &s
}
