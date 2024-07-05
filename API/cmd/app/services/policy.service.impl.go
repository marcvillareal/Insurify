package services

import (
	"bytes"
	"context"

	"github.com/jung-kurt/gofpdf"
	"gitlab-se.eeecs.qub.ac.uk/CSC3032-2324/CSC3032-2324-TEAM15/cmd/app/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type PolicyServiceImpl struct {
	policyCollection *mongo.Collection
	ctx              context.Context
}

func NewPolicyService(policyCollection *mongo.Collection, ctx context.Context) PolicyService {
	return &PolicyServiceImpl{
		policyCollection: policyCollection,
		ctx:              ctx,
	}
}

func (p *PolicyServiceImpl) GetPolicy(id *string) (*models.Policy, error) {
	var user *models.Policy
	// Convert the string ID to ObjectID
	objID, err := primitive.ObjectIDFromHex(*id)
	if err != nil {
		return nil, err
	}
	// Construct the query to find the user by _id
	query := bson.M{"_id": objID}
	// Execute the query and decode the result into the user variable
	err = p.policyCollection.FindOne(p.ctx, query).Decode(&user)
	// Handle any errors that occurred during the query
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (p *PolicyServiceImpl) GetProduct(id *string) (*models.Policy, error) {
	var user *models.Policy
	// Convert the string ID to ObjectID
	objID, err := primitive.ObjectIDFromHex(*id)
	if err != nil {
		return nil, err
	}
	// Construct the query to find the user by _id
	query := bson.M{"_id": objID}
	// Execute the query and decode the result into the user variable
	err = p.policyCollection.FindOne(p.ctx, query).Decode(&user)
	// Handle any errors that occurred during the query
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (m *PolicyServiceImpl) GetPolicyByUserId(userID *string) (*models.Policy, error) {
	var policy *models.Policy
	query := bson.D{{Key: "user_id", Value: userID}}
	err := m.policyCollection.FindOne(m.ctx, query).Decode(&policy)
	if err != nil {
		return nil, err
	}
	return policy, nil
}

// Method to generate a PDF from policy data
func GeneratePDFFromPolicy(policy *models.Policy) ([]byte, error) {
	// Create a new PDF instance
	pdf := gofpdf.New("P", "mm", "A4", "")
	pdf.AddPage()
	pdf.SetFont("Arial", "B", 16)

	// Title
	pdf.Cell(40, 10, "Policy Information")

	// Add policy details to the PDF
	pdf.Ln(10)
	pdf.SetFontSize(13) // Set font size
	pdf.Cell(0, 10, "First Name: "+*policy.First_name)
	pdf.Ln(10)
	pdf.Cell(0, 10, "Last Name: "+*policy.Last_name)
	pdf.SetFontSize(12)
	pdf.Ln(10)
	pdf.Cell(0, 10, "Start Date: "+policy.Start_date.Format("2006-01-02"))
	pdf.Ln(10)
	pdf.Cell(0, 10, "End Date: "+policy.End_date.Format("2006-01-02"))
	pdf.Ln(10)
	pdf.Cell(0, 10, "Product Description:")
	pdf.Ln(8)
	pdf.SetFontSize(9)
	pdf.MultiCell(0, 10, *policy.Product.Description, "", "", false)
	pdf.Ln(2)
	pdf.SetFontSize(12)
	pdf.Cell(0, 10, "Product Type: "+*policy.Product.Type)
	pdf.Ln(10)
	pdf.Cell(0, 10, "Product Discount: "+*policy.Product.Discount)

	// Write PDF content to a buffer
	var buf bytes.Buffer
	err := pdf.Output(&buf)
	if err != nil {
		return nil, err
	}

	// Return buffer content as []byte
	return buf.Bytes(), nil
}

// Handler function to serve PDF based on user ID
func (p *PolicyServiceImpl) ServePDFByUserId(userID *string) ([]byte, error) {
	// Retrieve policy data for the given user ID
	policy, err := p.GetPolicyByUserId(userID)
	if err != nil {
		return nil, err
	}

	// Generate PDF from policy data
	pdfData, err := GeneratePDFFromPolicy(policy)
	if err != nil {
		return nil, err
	}

	return pdfData, nil
}
