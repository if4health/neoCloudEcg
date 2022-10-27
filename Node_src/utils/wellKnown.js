module.exports = {
  authorization_endpoint: `${process.env.DEFAULT_URL}/auth/register`,
  token_endpoint: `${process.env.DEFAULT_URL}/auth/token`,
  token_endpoint_auth_methods_supported: ['private_key_jwt'],
  grant_types_supported: ['authorization_code', 'client_credentials'],
  scopes_supported: ['patient/*.rs'],
  response_types_supported: ['code'],
  capabilities: ['client-confidential-asymmetric'],
  code_challenge_methods_supported: ['S256'],
  token_endpoint_auth_signing_alg_values_supported: ['RS384', 'ES384'],
};
