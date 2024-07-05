package services_tests

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/models"
)

type mockUserAuthService struct {
	mock.Mock
}

func (m *mockUserAuthService) SignUp() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Mock logic for SignUp
		var user models.User
		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Mock successful signup response
		c.JSON(http.StatusOK, gin.H{"message": "User signed up successfully"})
	}
}

func (m *mockUserAuthService) Login() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Mock logic for Login
		var user models.User
		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Mock successful login response
		c.JSON(http.StatusOK, gin.H{"message": "User logged in successfully"})
	}
}

func TestSignUp(t *testing.T) {
	// Mock service and setup expected values
	mockService := new(mockUserAuthService)

	// Create a mock HTTP request
	reqBody := []byte(`{"email": "test@example.com", "password": "password"}`) // Adjust as needed
	req, _ := http.NewRequest("POST", "/auth/signup", bytes.NewBuffer(reqBody))
	w := httptest.NewRecorder()

	// Create a Gin engine instance and register the controller
	router := gin.Default()

	// Create SignUp handler directly
	router.POST("/auth/signup", mockService.SignUp())

	// Perform the request
	router.ServeHTTP(w, req)

	// Verify the response
	assert.Equal(t, http.StatusOK, w.Code)

	// Decode the response body and verify its content
	var responseBody map[string]string
	err := json.Unmarshal(w.Body.Bytes(), &responseBody)
	assert.NoError(t, err)
	assert.Equal(t, "User signed up successfully", responseBody["message"])
}

func TestLogin(t *testing.T) {
	// Mock service and setup expected values
	mockService := new(mockUserAuthService)

	// Create a mock HTTP request
	reqBody := []byte(`{"email": "test@example.com", "password": "password"}`) // Adjust as needed
	req, _ := http.NewRequest("POST", "/auth/login", bytes.NewBuffer(reqBody))
	w := httptest.NewRecorder()

	// Create a Gin engine instance and register the controller
	router := gin.Default()

	// Create Login handler directly
	router.POST("/auth/login", mockService.Login())

	// Perform the request
	router.ServeHTTP(w, req)

	// Verify the response
	assert.Equal(t, http.StatusOK, w.Code)

	// Decode the response body and verify its content
	var responseBody map[string]string
	err := json.Unmarshal(w.Body.Bytes(), &responseBody)
	assert.NoError(t, err)
	assert.Equal(t, "User logged in successfully", responseBody["message"])
}
