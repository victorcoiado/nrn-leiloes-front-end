export function getApiAuthUrl() {
  switch (process.env.REACT_APP_ENVIRONMENT) {
    case "homolog":
      return process.env.REACT_APP_BASE_AUTH_URL_HML_API;
    default:
      return process.env.REACT_APP_BASE_AUTH_URL_HML_API;
  }
}

export function getApiLeadUrl() {
  switch (process.env.REACT_APP_ENVIRONMENT) {
    case "homolog":
      return process.env.REACT_APP_BASE_LEAD_URL_HML_API;
    default:
      return process.env.REACT_APP_BASE_LEAD_URL_HML_API;
  }
}
