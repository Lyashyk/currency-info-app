import { createRequest } from "./utils";

const createApi = () => {
  const request = createRequest(
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange"
  );

  return {
    headingForDate: (date) => request({ date }),
    headingForNowDate: () => request(),
    headingForCurrenDateAndCurrentCurrency: (valcode, date) =>
      request({ valcode, date }),
  };
};

const api = createApi();

export default api;
