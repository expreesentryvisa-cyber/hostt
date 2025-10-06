import React, { useState, useEffect } from 'react';
import "./adminpanel.css"
// --- Configuration Data for RecordSearch ---
const referenceOptionsData = {
  DFTTA: [
    "Transaction Reference Number (TRN)",
    "Visa Evidence Number",
    "Visa Grant Number",
    "Password",
  ],
  ImmiCard: [
    "Transaction Reference Number (TRN)",
    "Visa Evidence Number",
    "Visa Grant Number",
    "Password",
  ],
  Passport: [
    "Transaction Reference Number (TRN)",
    "Visa Evidence Number",
    "Visa Grant Number",
    "Password",
  ],
  "PL056 (M56)": { hasReferenceDropdown: false },
  "Titre de Voyage": [
    "Transaction Reference Number (TRN)",
    "Visa Evidence Number",
    "Visa Grant Number",
    "Password",
  ],
};

// --- Simulated API Endpoint ---
// NOTE: Replace this with your actual MongoDB/Express backend endpoint when deploying.
const API_ENDPOINT = 'https://hosttapi.onrender.com/vevo-records'; 

// === 1. Record Search Component ===
const RecordSearch = ({ onSearchSuccess }) => {
  const [documentType, setDocumentType] = useState("");
  const [referenceType, setReferenceType] = useState("");
  const [referenceValue, setReferenceValue] = useState("");
  const [currentReferenceOptions, setCurrentReferenceOptions] = useState([]);
  const [showReferenceDropdown, setShowReferenceDropdown] = useState(false);
  const [visaEvidenceNumber, setVisaEvidenceNumber] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Effect to update reference options based on document type selection
  useEffect(() => {
    setMessage('');
    if (documentType && referenceOptionsData[documentType]) {
      const config = referenceOptionsData[documentType];
      if (Array.isArray(config)) {
        setShowReferenceDropdown(true);
        setCurrentReferenceOptions(config);
      } else if (config.hasReferenceDropdown === false) {
        setShowReferenceDropdown(false);
        setCurrentReferenceOptions([]);
      }
    } else {
      setShowReferenceDropdown(false);
      setCurrentReferenceOptions([]);
    }
    setReferenceType("");
    setReferenceValue("");
    setVisaEvidenceNumber("");
  }, [documentType]);

  // Clear the reference value when the reference type changes
  useEffect(() => {
    setReferenceValue("");
  }, [referenceType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // --- Basic Validation ---
    if (!documentType) return handleValidationFail("Please select a Document type.");
    
    const isPL056 = documentType === "PL056 (M56)";

    if (showReferenceDropdown && !isPL056) {
      if (!referenceType) return handleValidationFail("Please select a Reference type.");
      if (!referenceValue) return handleValidationFail(`Please enter the value for ${referenceType}.`);
    }

    if (isPL056 && !visaEvidenceNumber) return handleValidationFail("Please enter the Visa Evidence Number.");
    if (!dateOfBirth) return handleValidationFail("Please enter your Date of birth.");

    if (!isPL056 && !documentNumber) {
      const label = documentType === "ImmiCard" ? "ImmiCard Number" : "Document number";
      return handleValidationFail(`Please enter the ${label}.`);
    }

    if (documentType === "Passport" && !country) return handleValidationFail("Please select the Country of document.");
    
    if (!termsAccepted) return handleValidationFail("You must agree to the terms and conditions.");
    
    const searchParams = {
        documentType,
        documentNumber: isPL056 ? "N/A" : documentNumber,
        dateOfBirth,
        referenceType: isPL056 ? "Visa Evidence Number" : referenceType,
        referenceValue: isPL056 ? visaEvidenceNumber : referenceValue,
        country: country || "N/A",
        termsAccepted
    };

    // Simulate search operation
    setTimeout(() => {
        console.log("Searching with parameters (Simulated successful search):", searchParams);
        setLoading(false);
        setMessage("Search successful! Redirecting to record entry...");
        if (onSearchSuccess) {
            // Pass a generic record structure to populate the admin panel with defaults
            onSearchSuccess(searchParams); 
        }
    }, 1500);
  };

  const handleValidationFail = (msg) => {
    setLoading(false);
    setMessage(msg);
    return false;
  }

  const handleClear = () => {
    setDocumentType("");
    setReferenceType("");
    setReferenceValue("");
    setVisaEvidenceNumber("");
    setDocumentNumber("");
    setDateOfBirth("");
    setCountry("");
    setTermsAccepted(false);
    setMessage('');
  };

  const isPL056 = documentType === "PL056 (M56)";
  const isImmiCard = documentType === "ImmiCard";
  const hideCountryField = isPL056 || isImmiCard || !documentType || documentType === "Titre de Voyage";
  const documentNumberLabel = isImmiCard ? "ImmiCard Number" : "Document number";

  return (
    <div className="vevo-search-card">
      <h2>Visa Holder Enquiry</h2>
      <div className="vevo-search-instructions">
        Please complete the following details to search for an existing visa record.
        <span className="vevo-required-marker">*</span> indicates a mandatory field.
      </div>
      <form onSubmit={handleSubmit}>
        <div className="vevo-form-grid">
        
          {/* Message Box for errors/success */}
          {message && (
            <div className={`vevo-message-box ${message.includes('success') || message.includes('Search successful') ? 'vevo-message-success' : 'vevo-message-error'}`}>
                {message}
            </div>
          )}

          {/* 1. Document Type */}
          <div className="vevo-form-group vevo-full-width">
            <label htmlFor="documentType">Document type<span className="vevo-required-marker">*</span></label>
            <select
              id="documentType"
              className="vevo-input-field"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              required
            >
              <option value="">Please select the document type...</option>
              {Object.keys(referenceOptionsData).map(key => (
                  <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>

          {/* 2 & 3. Reference Type & Value (Conditional for Non-PL056) */}
          {documentType && !isPL056 && showReferenceDropdown && (
            <>
              <div className="vevo-form-group">
                <label htmlFor="referenceType">Reference type<span className="vevo-required-marker">*</span></label>
                <select
                  id="referenceType"
                  className="vevo-input-field"
                  value={referenceType}
                  onChange={(e) => setReferenceType(e.target.value)}
                  required={!isPL056}
                >
                  <option value="">Please select the reference type...</option>
                  {currentReferenceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="vevo-form-group">
                <label htmlFor="referenceValue">{referenceType || 'Reference Value'}<span className="vevo-required-marker">*</span></label>
                <input
                  id="referenceValue"
                  type="text"
                  className="vevo-input-field"
                  value={referenceValue}
                  onChange={(e) => setReferenceValue(e.target.value)}
                  placeholder={`Enter your ${referenceType || 'Reference ID'}`}
                  required={!!referenceType}
                />
              </div>
            </>
          )}
          
          {/* 2 & 3. PL056 Specific Reference Field */}
          {documentType && isPL056 && (
              <div className="vevo-form-group vevo-full-width">
                <label htmlFor="visaEvidenceNumber">Visa Evidence Number<span className="vevo-required-marker">*</span></label>
                <input
                  id="visaEvidenceNumber"
                  type="text"
                  className="vevo-input-field"
                  value={visaEvidenceNumber}
                  onChange={(e) => setVisaEvidenceNumber(e.target.value)}
                  placeholder="Enter Visa Evidence Number"
                  required
                />
              </div>
          )}


          {/* 4. Date of Birth */}
          <div className="vevo-form-group">
            <label htmlFor="dateOfBirth">Date of birth<span className="vevo-required-marker">*</span></label>
            <input
              id="dateOfBirth"
              type="date"
              className="vevo-input-field"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          
          {/* 5. Document Number (or ImmiCard Number) (Hidden for PL056) */}
          {documentType && !isPL056 && (
            <div className="vevo-form-group">
                <label htmlFor="documentNumber">{documentNumberLabel}<span className="vevo-required-marker">*</span></label>
                <input
                  id="documentNumber"
                  type="text"
                  className="vevo-input-field"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  placeholder={`Enter ${documentNumberLabel}`}
                  required
                />
            </div>
          )}

          {/* 6. Country (Only for Passport/DFTTA - Simplified) */}
          {documentType && !hideCountryField && (
            <div className="vevo-form-group vevo-full-width">
                <label htmlFor="country">Country of document<span className="vevo-required-marker">*</span></label>
                <select
                  id="country"
                  className="vevo-input-field"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  <option value="">Select Country</option>
                  <option value="Australia">Australia</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="New Zealand">New Zealand</option>
                </select>
            </div>
          )}
          
          {/* 7. Terms */}
          <div className="vevo-terms-box">
            <a href="#">View Terms and Conditions</a>
            <div className="vevo-form-group-inline vevo-terms-checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                />
                <label htmlFor="terms">
                    I have read and agree to the terms and conditions<span className="vevo-required-marker">*</span>
                </label>
            </div>
          </div>


        </div>

        <div className="vevo-form-actions vevo-search-actions">
          {loading && <span className="vevo-loading-text">Adding...</span>}
          <button
            type="button"
            className="vevo-btn vevo-btn-clear"
            onClick={handleClear}
            disabled={loading}
          >
            Clear
          </button>
          <button
            type="submit"
            className="vevo-btn vevo-btn-submit"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Record'}
          </button>
        </div>
      </form>
    </div>
  );
};

// === 2. VEVO Record Entry Panel Component (AdminPanel) ===
const AdminPanel = ({ onBackToSearch, initialData }) => {
  // State variables matching the VEVO record structure
  const [familyName, setFamilyName] = useState('SONIA RANI');
  const [documentNumber, setDocumentNumber] = useState('W5919826');
  const [countryOfPassport, setCountryOfPassport] = useState('INDIA');
  const [visaClassSubclass, setVisaClassSubclass] = useState('FA / 600');
  const [visaDescription, setVisaDescription] = useState('VISITOR');
  const [visaStream, setVisaStream] = useState('Tourist');
  const [visaApplicant, setVisaApplicant] = useState('Primary');
  const [visaGrantDate, setVisaGrantDate] = useState(new Date().toISOString().substring(0, 10));
  const [visaExpiryDate, setVisaExpiryDate] = useState(new Date(Date.now() + 31536000000).toISOString().substring(0, 10)); // ~1 year from now
  const [location, setLocation] = useState('Offshore');
  const [visaStatus, setVisaStatus] = useState('In Effect');
  const [visaGrantNumber, setVisaGrantNumber] = useState('10695866027699');
  const [entriesAllowed, setEntriesAllowed] = useState('Multiple entries to and from Australia');
  const [mustNotArriveAfter, setMustNotArriveAfter] = useState(new Date(Date.now() + 31536000000).toISOString().substring(0, 10));
  const [periodOfStay, setPeriodOfStay] = useState('03 months on each arrival');
  const [workEntitlements, setWorkEntitlements] = useState('The Visa Holder does not have Work Entitlements');
  const [studyEntitlements, setStudyEntitlements] = useState('The Visa Holder has limited Study Entitlements');
  const [visaConditions, setVisaConditions] = useState('8101 - unable to display condition details:\n8201 - unable to display condition details:');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Constants for dropdowns
  const countries = ['INDIA', 'Australia', 'United States', 'Canada', 'United Kingdom', 'Other'];
  const statusOptions = ['In Effect', 'Expired', 'Cancelled', 'Pending','Finalised'];
  const entriesOptions = ['Multiple entries to and from Australia', 'Single entry only'];
  const workEntitlementsOptions = ['The Visa Holder does not have Work Entitlements', 'May work (full rights)', 'May work (limited hours)'];

  // This function simulates the API call to save the record
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const record = {
      // Include the search parameters from initialData
      documentType: initialData?.documentType || '',
      referenceType: initialData?.referenceType || '',
      referenceValue: initialData?.referenceValue || '',
      // Original VEVO record fields
      familyName,
      documentNumber,
      countryOfPassport,
      visaClassSubclass,
      visaDescription,
      visaStream,
      visaApplicant,
      visaGrantDate,
      visaExpiryDate,
      location,
      visaStatus,
      visaGrantNumber,
      entriesAllowed,
      mustNotArriveAfter,
      periodOfStay,
      workEntitlements,
      studyEntitlements,
      visaConditions,
      timestamp: new Date().toISOString(),
    };

    try {
        // --- Actual API Call Implementation ---
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add Authorization header here if needed: 'Authorization': 'Bearer YOUR_TOKEN'
            },
            body: JSON.stringify(record),
        });

        if (response.ok) {
            // Success response (Simulated 200 or 201)
            // In a real app, you might parse: const result = await response.json();
            
            setMessage("VEVO Record successfully saved to MongoDB with search parameters included.");
            console.log("Successfully sent data to API:", record);

        } else {
            // Error response (Simulated 4xx or 5xx)
            // In a real app, you might read the error: const errorData = await response.json();
            
            // Simulating an error case for demonstration
            throw new Error(`Server responded with status ${response.status}. Save operation failed.`);
        }
    } catch (error) {
        // Network errors or specific throw errors
        console.error("API Submission Error:", error);
        setMessage(`Error saving record: ${error.message}. Please check API endpoint in code.`);
    } finally {
        setLoading(false);
    }
  };

  const handleClear = () => {
    setFamilyName('');
    setDocumentNumber('');
    setCountryOfPassport('INDIA');
    setVisaClassSubclass('');
    setVisaDescription('');
    setVisaStream('');
    setVisaApplicant('');
    setVisaGrantDate(new Date().toISOString().substring(0, 10));
    setVisaExpiryDate(new Date(Date.now() + 31536000000).toISOString().substring(0, 10));
    setLocation('');
    setVisaStatus('In Effect');
    setVisaGrantNumber('');
    setEntriesAllowed('Multiple entries to and from Australia');
    setMustNotArriveAfter(new Date(Date.now() + 31536000000).toISOString().substring(0, 10));
    setPeriodOfStay('');
    setWorkEntitlements('The Visa Holder does not have Work Entitlements');
    setStudyEntitlements('');
    setVisaConditions('');
    setMessage('');
  };

  const isSuccess = message.includes('successfully saved');
  const isError = message.includes('Error');

  return (
    <div className="vevo-admin-card">
      <h2>VEVO Record Data Entry Panel</h2>
      
      {/* Display search context information */}
      {initialData && (
        <div className="vevo-search-context">
          <h3>Search Context</h3>
          <div className="vevo-context-info">
            <span><strong>Document Type:</strong> {initialData.documentType}</span>
            <span><strong>Reference Type:</strong> {initialData.referenceType}</span>
            <span><strong>Reference Value:</strong> {initialData.referenceValue}</span>
            <span><strong>Date of Birth:</strong> {initialData.dateOfBirth}</span>
          </div>
        </div>
      )}
      
      <div className="vevo-form-grid">
        
        {/* Message Box for errors/success */}
        {(isSuccess || isError) && (
            <div className={`vevo-message-box ${isSuccess ? 'vevo-message-success' : 'vevo-message-error'}`}>
                {message}
            </div>
        )}

      </div>
      <form onSubmit={handleSubmit}>
        <div className="vevo-form-grid">
          
          {/* Row 1: Key Identifiers */}
          <div className="vevo-form-group">
            <label htmlFor="familyName">Family name</label>
            <input
              id="familyName"
              type="text"
              className="vevo-input-field"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              placeholder="e.g., SONIA RANI"
              required
            />
          </div>

          <div className="vevo-form-group">
            <label htmlFor="documentNumber">Document number</label>
            <input
              id="documentNumber"
              type="text"
              className="vevo-input-field"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              placeholder="e.g., W5919826"
              required
            />
          </div>

          {/* Row 2: Dates and Grant Info */}
          <div className="vevo-form-group">
            <label htmlFor="visaGrantDate">Visa grant date</label>
            <input
              id="visaGrantDate"
              type="date"
              className="vevo-input-field"
              value={visaGrantDate}
              onChange={(e) => setVisaGrantDate(e.target.value)}
              required
            />
          </div>

          <div className="vevo-form-group">
            <label htmlFor="visaExpiryDate">Visa expiry date</label>
            <input
              id="visaExpiryDate"
              type="date"
              className="vevo-input-field"
              value={visaExpiryDate}
              onChange={(e) => setVisaExpiryDate(e.target.value)}
              required
            />
          </div>
          
          {/* Row 3: Visa Details */}
          <div className="vevo-form-group">
            <label htmlFor="visaClassSubclass">Visa class / subclass</label>
            <input
              id="visaClassSubclass"
              type="text"
              className="vevo-input-field"
              value={visaClassSubclass}
              onChange={(e) => setVisaClassSubclass(e.target.value)}
              placeholder="e.g., FA / 600"
            />
          </div>

          <div className="vevo-form-group">
            <label htmlFor="visaGrantNumber">Visa grant number</label>
            <input
              id="visaGrantNumber"
              type="text"
              className="vevo-input-field"
              value={visaGrantNumber}
              onChange={(e) => setVisaGrantNumber(e.target.value)}
              placeholder="e.g., 10695866027699"
            />
          </div>
          
          {/* Row 4: Status and Location */}
          <div className="vevo-form-group">
            <label htmlFor="visaStatus">Visa status</label>
            <select
              id="visaStatus"
              className="vevo-input-field"
              value={visaStatus}
              onChange={(e) => setVisaStatus(e.target.value)}
              required
            >
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="vevo-form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              className="vevo-input-field"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Offshore"
            />
          </div>

          {/* Row 5: Stream and Applicant */}
          <div className="vevo-form-group">
            <label htmlFor="visaStream">Visa stream</label>
            <input
              id="visaStream"
              type="text"
              className="vevo-input-field"
              value={visaStream}
              onChange={(e) => setVisaStream(e.target.value)}
              placeholder="e.g., Tourist"
            />
          </div>

          <div className="vevo-form-group">
            <label htmlFor="visaApplicant">Visa applicant</label>
            <input
              id="visaApplicant"
              type="text"
              className="vevo-input-field"
              value={visaApplicant}
              onChange={(e) => setVisaApplicant(e.target.value)}
              placeholder="e.g., Primary"
            />
          </div>

          {/* Row 6: Travel Conditions */}
          <div className="vevo-form-group">
            <label htmlFor="mustNotArriveAfter">Must not arrive after</label>
            <input
              id="mustNotArriveAfter"
              type="date"
              className="vevo-input-field"
              value={mustNotArriveAfter}
              onChange={(e) => setMustNotArriveAfter(e.target.value)}
            />
          </div>

          <div className="vevo-form-group">
            <label htmlFor="entriesAllowed">Entries allowed</label>
            <select
              id="entriesAllowed"
              className="vevo-input-field"
              value={entriesAllowed}
              onChange={(e) => setEntriesAllowed(e.target.value)}
            >
              {entriesOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Row 7: Work/Stay Conditions */}
          <div className="vevo-form-group">
            <label htmlFor="periodOfStay">Period of stay</label>
            <input
              id="periodOfStay"
              type="text"
              className="vevo-input-field"
              value={periodOfStay}
              onChange={(e) => setPeriodOfStay(e.target.value)}
              placeholder="e.g., 03 months on each arrival"
            />
          </div>

          <div className="vevo-form-group">
            <label htmlFor="workEntitlements">Work entitlements</label>
            <select
              id="workEntitlements"
              className="vevo-input-field"
              value={workEntitlements}
              onChange={(e) => setWorkEntitlements(e.target.value)}
            >
              {workEntitlementsOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Row 8: Country and Description */}
          <div className="vevo-form-group">
            <label htmlFor="countryOfPassport">Country of Passport</label>
            <select
              id="countryOfPassport"
              className="vevo-input-field"
              value={countryOfPassport}
              onChange={(e) => setCountryOfPassport(e.target.value)}
              required
            >
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          
          <div className="vevo-form-group">
            <label htmlFor="visaDescription">Visa description</label>
            <input
              id="visaDescription"
              type="text"
              className="vevo-input-field"
              value={visaDescription}
              onChange={(e) => setVisaDescription(e.target.value)}
              placeholder="e.g., VISITOR"
            />
          </div>
          
          {/* Row 9: Study Entitlements (Full Width) */}
          <div className="vevo-form-group vevo-full-width">
            <label htmlFor="studyEntitlements">Work entitlements</label>
            <textarea
              id="studyEntitlements"
              className="vevo-input-field vevo-text-area-large"
              value={studyEntitlements}
              onChange={(e) => setStudyEntitlements(e.target.value)}
              placeholder="Enter detailed work entitlements..."
            />
          </div>

          {/* Row 10: Visa Conditions (Full Width) */}
          <div className="vevo-form-group vevo-full-width">
            <label htmlFor="visaConditions">Visa condition(s)</label>
            <textarea
              id="visaConditions"
              className="vevo-input-field vevo-text-area-large"
              value={visaConditions}
              onChange={(e) => setVisaConditions(e.target.value)}
              placeholder="Enter all visa conditions, one per line..."
            />
          </div>
        </div>

        <div className="vevo-form-actions">
            {/* Back Button added here */}
            <button
              type="button"
              className="vevo-btn vevo-btn-back"
              onClick={onBackToSearch}
              disabled={loading}
            >
              &larr; Back to Search
            </button>
          
          <div className="vevo-btn-group-right">
            {loading && <span className="vevo-loading-text">Submitting...</span>}
            <button
              type="button"
              className="vevo-btn vevo-btn-clear"
              onClick={handleClear}
              disabled={loading}
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="vevo-btn vevo-btn-submit"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Save VEVO Record'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// === 3. Main Application Root (VEVOApp) ===
const VEVOApp = () => {
  const [currentView, setCurrentView] = useState('search'); // State can be 'search' or 'admin'
  const [searchContext, setSearchContext] = useState(null); // Stores data from the search form

  const handleSearchSuccess = (searchParams) => {
    setSearchContext(searchParams);
    setCurrentView('admin');
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
    setSearchContext(null);
  };
  return (
    <>
      <div className="vevo-app-container">
        {currentView === 'search' ? (
          <RecordSearch onSearchSuccess={handleSearchSuccess} />
        ) : (
          <AdminPanel 
            onBackToSearch={handleBackToSearch} 
            initialData={searchContext}
          />
        )}
      </div>
    </>
  );
};

export default VEVOApp;
