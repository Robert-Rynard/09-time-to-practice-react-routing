import React, { useEffect } from "react";

import QuoteForm from "../components/quotes/QuoteForm";
import { addQuote } from "../lib/api";
import useHTTP from "../hooks/use-http";
import { useHistory } from "react-router-dom";

const NewQuote = () => {
  const history = useHistory();
  const { sendRequest, status } = useHTTP(addQuote);

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
