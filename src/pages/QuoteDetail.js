import { Outlet, useParams } from "react-router-dom";
import React, { useEffect } from "react";

import HighLightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { getSingleQuote } from "../lib/api";
import useHttp from "../hooks/use-http";

const QuoteDetail = () => {
  const { quoteId } = useParams();
  const {
    sendRequest,
    data: loadedQuote,
    status,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <>
      <HighLightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Outlet />
    </>
  );
};

export default QuoteDetail;
