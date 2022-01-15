import React, { useEffect } from "react";

import QuoteForm from "../components/quotes/QuoteForm";
import { addQuote } from "../lib/api";
import useHTTP from "../hooks/use-http";
import { useNavigate } from "react-router-dom";

const NewQuote = () => {
  const navigate = useNavigate();
  const { sendRequest, status } = useHTTP(addQuote);

  useEffect(() => {
    if (status === "completed") {
      navigate("/quotes");
    }
  }, [status, navigate]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
