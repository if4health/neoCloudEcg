module.exports = {
  resourceType: 'CapabilityStatement',
  date: new Date().toISOString(),
  fhirVersion: '4.0.0',
  format: ['application/fhir+json'],
  implementation: {
    description: 'FHIR REST Server',
    url: `${process.env.DEFAULT_URL}`,
  },
  status: 'active',
  rest: [
    {
      security: {
        cors: true,
        extension: [
          {
            url: 'http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris',
            extension: [
              {
                url: 'authorize',
                valueUri: `${process.env.DEFAULT_URL}/auth/register`,
              },
              {
                url: 'token',
              },
            ],
          },
        ],
        service: [
          {
            coding: [
              {
                system: 'http://hl7.org/fhir/restful-security-service',
                code: 'SMART-on-FHIR',
              },
            ],
            text: 'OAuth2 using SMART-on-FHIR profile (see http://docs.smarthealthit.org)',
          },
        ],
      },
    },
  ],
};
