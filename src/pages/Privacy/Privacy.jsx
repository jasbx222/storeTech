import React from "react";
import { Card, Skeleton } from "@mui/material"; // Import Skeleton from Material-UI
import useTerms from "../../hooks/useTerms"; // Corrected import for default export
import "./Privacy.css";
import HeadTitle from "../HeadTitle/HeadTitle";

const PrivacyTerms = () => {
  const { TermsData, loading, error } = useTerms(); // Call the useTerms hook

  if (loading) {
    // Skeleton loading while data is being fetched
    return (
      <>
     
      <div className="privacy">
        <div className="container">
          <div className="space-y-8">
            <div className="text-center">
              <Skeleton variant="text" width={200} height={40} /> {/* Skeleton for Title */}
              <Skeleton variant="text" width="100%" height={20} /> {/* Skeleton for Paragraph */}
            </div>

            <section className="privacy-section">
              <Skeleton variant="text" width="100%" height={40} /> {/* Skeleton for Subheading */}
              <Skeleton variant="rectangular" width="100%" height={200} /> {/* Skeleton for Content */}
            </section>
          </div>
        </div>
      </div>
      </>
    );
  }

  if (error) {
    return <div>{error}</div>; // Show error message if fetching fails
  }

  // If TermsData is not an array, we directly display the data
  return (
    <>
     <HeadTitle title="الشروط والأحكام" /> 
    <div className="privacy">
      <div className="container">
        <div className="space-y-8">
        

         
          {TermsData && (
            <section className="privacy-section">
              <h2>{TermsData.title}</h2>
              <div
                className="terms-content"
                dangerouslySetInnerHTML={{ __html: TermsData.content }} 
              />
            </section>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default PrivacyTerms;
