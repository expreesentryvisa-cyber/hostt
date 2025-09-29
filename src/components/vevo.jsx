import { useState, useEffect } from "react";
import "../vevo.css";
import VevoHeader from "./HeaderForVevo";

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
};

// API endpoint configuration
const API_BASE_URL = 'http://localhost:3000';

const Vevo = () => {
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
  
  // State for API interaction and results
  const [showResults, setShowResults] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [visaData, setVisaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (documentType && referenceOptionsData[documentType]) {
      const config = referenceOptionsData[documentType];
      if (config.hasReferenceDropdown === false) {
        setShowReferenceDropdown(false);
        setCurrentReferenceOptions([]);
      } else {
        setShowReferenceDropdown(true);
        setCurrentReferenceOptions(config);
      }
      setReferenceType("");
      setReferenceValue(""); 
    } else {
      setShowReferenceDropdown(false);
      setCurrentReferenceOptions([]);
      setReferenceType("");
      setReferenceValue("");
    }
    setVisaEvidenceNumber("");
    setDocumentNumber("");
    setDateOfBirth("");
    setCountry("");
    setError("");
  }, [documentType]);

  useEffect(() => {
    setReferenceValue("");
  }, [referenceType]);

  // API call to search for visa records
  const searchVisaRecord = async (searchData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/vevo-records/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message || 'Record not found' };
      }
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, message: 'Network error. Please check your connection.' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Basic Validation
    if (!documentType) {
        setError("Please select a Document type.");
        setLoading(false);
        return;
    }

    if (showReferenceDropdown && referenceType && !referenceValue) {
        setError(`Please enter the value for ${referenceType}.`);
        setLoading(false);
        return;
    }

    if (documentType === "PL056 (M56)" && !visaEvidenceNumber) {
        setError("Please enter the Visa Evidence Number.");
        setLoading(false);
        return;
    }

    if (!dateOfBirth) {
        setError("Please enter your Date of birth.");
        setLoading(false);
        return;
    }

    if (documentType !== "PL056 (M56)" && !documentNumber) {
        const label = documentType === "ImmiCard" ? "ImmiCard Number" : "Document number";
        setError(`Please enter the ${label}.`);
        setLoading(false);
        return;
    }

    if (documentType !== "PL056 (M56)" && documentType !== "ImmiCard" && !country) {
        setError("Please select the Country of document.");
        setLoading(false);
        return;
    }
    
    if (!termsAccepted) {
        setError("You must agree to the terms and conditions.");
        setLoading(false);
        return;
    }

    // Prepare search data
    const searchData = {
        documentType,
        referenceType: documentType === "PL056 (M56)" ? "Visa Evidence Number" : referenceType,
        referenceValue: documentType === "PL056 (M56)" ? visaEvidenceNumber : referenceValue,
        dateOfBirth,
        documentNumber: documentType === "PL056 (M56)" ? "N/A" : documentNumber,
        country: country || "N/A",
    };

    // Search for the visa record
    const result = await searchVisaRecord(searchData);
    
    setLoading(false);

    if (result.success) {
      setSubmittedData(searchData);
      setVisaData(result.data);
      setShowResults(true);
    } else {
      setError(result.message);
    }
  };

  const handleClear = () => {
    setDocumentType("");
    setReferenceType("");
    setReferenceValue("");
    setVisaEvidenceNumber("");
    setDocumentNumber("");
    setDateOfBirth("");
    setCountry("");
    setTermsAccepted(false);
    setError("");
  };

  const handleNewSearch = () => {
    setShowResults(false);
    setSubmittedData(null);
    setVisaData(null);
    setError("");
    handleClear();
  };

  const isPL056 = documentType === "PL056 (M56)";
  const isImmiCard = documentType === "ImmiCard";
  const hideCountryField = isPL056 || isImmiCard;
  const documentNumberLabel = isImmiCard ? "ImmiCard Number" : "Document number";

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-AU', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  // Get current date and time in Australian format
  const getCurrentDateTime = () => {
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric', 
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
      timeZone: 'Australia/Sydney'
    };
    return now.toLocaleDateString('en-AU', options) + ' (AEST) Canberra, Australia (GMT +1000)';
  };

  // Parse visa conditions (assuming they're stored as a string)
  const parseVisaConditions = (conditions) => {
    if (!conditions) return [];
    if (Array.isArray(conditions)) return conditions;
    return conditions.split('\n').filter(condition => condition.trim());
  };

  if (showResults && submittedData && visaData) {
    return (
      <>
        <VevoHeader />
        <div className="vevo-wrapper">
          <div className="vevo-box">
            <div className="vevo-header">Visa Entitlement Verification Online (VEVO)</div>
            
            <div className="vevo-results">
        <div className="vevo-info-banner">
                <div className="vevo-info-header">
                  <span className="vevo-info-icon">ℹ</span> Information
                </div>
                <div className="vevo-info-text">
                  The entitlements associated with your current 'in-effect' visa are displayed below. If you believe these details are not correct, please contact the Department. Please note that visa application status and visa grants that are not yet in effect will not be shown below.
                </div>
              </div>
              
              <div className="vevo-action-bar">
                <button type="button" className="vevo-action-btn" onClick={handleNewSearch}>
                  New enquiry
                </button>
                <div className="vevo-export-buttons">
                  <button type="button" className="vevo-export-btn" onClick={() => window.print()}>
                    View as PDF
                  </button>
                  <button type="button" className="vevo-export-btn">
                    Send Email
                  </button>
                </div>
              </div>
              <div className="vevo-visa-details">
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Current date and time</span>
                  <span className="vevo-detail-value vevo-current-time">{getCurrentDateTime()}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Family name</span>
                  <span className="vevo-detail-value">{visaData.familyName || "N/A"}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Visa description</span>
                  <span className="vevo-detail-value">{visaData.visaDescription || "N/A"}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Document number</span>
                  <span className="vevo-detail-value">{visaData.documentNumber || submittedData.documentNumber}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Country of Passport</span>
                  <span className="vevo-detail-value">{visaData.countryOfPassport || submittedData.country}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Visa class / subclass</span>
                  <span className="vevo-detail-value">{visaData.visaClassSubclass || "N/A"}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Visa stream</span>
                  <span className="vevo-detail-value">{visaData.visaStream || "N/A"}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Visa applicant</span>
                  <span className="vevo-detail-value">{visaData.visaApplicant || "N/A"}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Visa grant date</span>
                  <span className="vevo-detail-value">{formatDate(visaData.visaGrantDate)}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Visa expiry date</span>
                  <span className="vevo-detail-value">{formatDate(visaData.visaExpiryDate)}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Location</span>
                  <span className="vevo-detail-value">{visaData.location || "N/A"}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Visa status</span>
                  <span className="vevo-detail-value vevo-status-active">{visaData.visaStatus || "N/A"}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Visa grant number</span>
                  <span className="vevo-detail-value">{visaData.visaGrantNumber || "N/A"}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Entries allowed</span>
                  <span className="vevo-detail-value">{visaData.entriesAllowed || "N/A"}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Must not arrive after</span>
                  <span className="vevo-detail-value">{formatDate(visaData.mustNotArriveAfter)}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Period of stay</span>
                  <span className="vevo-detail-value">{visaData.periodOfStay || "N/A"}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Work entitlements</span>
                  <span className="vevo-detail-value">{visaData.workEntitlements || "N/A"}</span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Workplace rights</span>
                  <span className="vevo-detail-value vevo-workplace-rights">
                    All employees in Australia are protected by workplace laws, including visa holders, for further information see:<br/>
                    <a href="https://immi.homeaffairs.gov.au/visas/working-in-australia/work-rights-and-exploitation" 
                       className="vevo-workplace-link" 
                       target="_blank" 
                       rel="noopener noreferrer">
                      https://immi.homeaffairs.gov.au/visas/working-in-australia/work-rights-and-exploitation
                    </a>
                  </span>
                </div>
                
                <div className="vevo-detail-row">
                  <span className="vevo-detail-label">Study entitlements</span>
                  <span className="vevo-detail-value">{visaData.studyEntitlements || "N/A"}</span>
                </div>
                
                <div className="vevo-detail-row vevo-visa-conditions">
                  <span className="vevo-detail-label">Visa condition(s)</span>
                  <div className="vevo-detail-value">
                    {parseVisaConditions(visaData.visaConditions).map((condition, index) => (
                      <div key={index} className="vevo-condition-item">{condition}</div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="btn" onClick={handleNewSearch}>
                  New Search
                </button>
                <button type="button" className="btn" onClick={() => window.print()}>
                  Print
                </button>
              </div>
            </div>
          </div>
          
          <div className="vevo-footer">
            <a href="#">Accessibility</a> | <a href="#">Online Security</a> |{" "}
            <a href="#">Privacy</a> | <a href="#">Copyright & Disclaimer</a> |{" "}
            <a href="#">Change Password</a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <VevoHeader />
      <div className="vevo-wrapper">
        <div className="vevo-box">
          <div className="vevo-header">Visa holder enquiry</div>

          <div className="vevo-instructions">
            Please complete the following details to view your visa entitlements.
            <br />
            Fields marked with <span className="required">*</span> are mandatory.
          </div>

          {error && (
            <div className="vevo-error-message">
              {error}
            </div>
          )}

          {loading && (
            <div className="vevo-loading-indicator">
              Searching for visa records, please wait...
            </div>
          )}

          <form onSubmit={handleSubmit} className="vevo-form">
            <div className="form-group">
              <label>Document type</label>
              <div className="input-wrapper">
                <span className="required">*</span>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Please select the document type...</option>
                  <option value="DFTTA">DFTTA</option>
                  <option value="ImmiCard">ImmiCard</option>
                  <option value="Passport">Passport</option>
                  <option value="PL056 (M56)">PL056 (M56)</option>
                  <option value="Titre de Voyage">Titre de Voyage</option>
                </select>
              </div>
            </div>

            {documentType && (
              <>
                {showReferenceDropdown && !isPL056 && (
                  <div className="form-group">
                    <label>Reference type</label>
                    <div className="input-wrapper">
                      <span className="required">*</span>
                      <select
                        value={referenceType}
                        onChange={(e) => setReferenceType(e.target.value)}
                        disabled={loading}
                      >
                        <option value="">Please select the reference type...</option>
                        {currentReferenceOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                
                {showReferenceDropdown && referenceType && !isPL056 && (
                    <div className="form-group">
                        <label>{referenceType}</label>
                        <div className="input-wrapper">
                            <span className="required">*</span>
                            <input 
                                type="text" 
                                value={referenceValue}
                                onChange={(e) => setReferenceValue(e.target.value)}
                                placeholder={`Enter your ${referenceType}`}
                                disabled={loading}
                            />
                        </div>
                    </div>
                )}

                {isPL056 && (
                  <div className="form-group">
                    <label>Visa Evidence Number</label>
                    <div className="input-wrapper">
                      <span className="required">*</span>
                      <input 
                        type="text" 
                        value={visaEvidenceNumber}
                        onChange={(e) => setVisaEvidenceNumber(e.target.value)}
                        placeholder="Enter Visa Evidence Number"
                        disabled={loading}
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label>Date of birth</label>
                  <div className="input-wrapper">
                    <span className="required">*</span>
                    <input 
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                {!isPL056 && (
                  <div className="form-group">
                    <label>{documentNumberLabel}</label>
                    <div className="input-wrapper">
                      <span className="required">*</span>
                      <input 
                        type="text" 
                        value={documentNumber}
                        onChange={(e) => setDocumentNumber(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>
                )}

                {!hideCountryField && (
                  <div className="form-group">
                    <label>Country of document</label>
                    <div className="input-wrapper">
                      <span className="required">*</span>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        disabled={loading}
                      >
                        <option value="">Select Country</option>
                        <option value="Australia">Australia</option>
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="terms">
                  <a href="#">View Terms and Conditions</a>
                  <div className="checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      id="terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      disabled={loading}
                    />
                    <span className="required"> * </span>
                    <label htmlFor="terms">
                      I have read and agree to the terms and conditions
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn" 
                    onClick={handleClear}
                    disabled={loading}
                  >
                    Clear
                  </button>
                  <button 
                    type="submit" 
                    className="btn"
                    disabled={loading}
                  >
                    {loading ? 'Searching...' : 'Submit'}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

      <div className="vevo-footer">
        <a href="#">Accessibility</a> | <a href="#">Online Security</a> |{" "}
        <a href="#">Privacy</a> | <a href="#">Copyright & Disclaimer</a> |{" "}
        <a href="#">Change Password</a>
      </div>
      </div>
    </>
  );
};

export default Vevo;