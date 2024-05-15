import axios from "axios";
import { useState } from "react";

export default function useRequest() {
  const [error, setError] = useState(null);

  const doRequest = async ({ url, method, body, onSuccess }) => {
    try {
      setError(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {

        console.log('error in signup',err);
      setError(
        <div className="alert alert-danger">
          <h4>Oops ..</h4>

          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, error };
}
