const { SecretClient } = require("@azure/keyvault-secrets");
const { ClientSecretCredential } = require("@azure/identity");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  const credential = new ClientSecretCredential(process.env.TENANT,process.env.CLIENT,process.env.SECRET)
  const url = process.env.URI;
  const client = new SecretClient(url, credential);
  for await (const secretProperties of client.listPropertiesOfSecrets()) {
    const secret = await client.getSecret(secretProperties.name);
    console.log("Secret Name:", secret.name, "\nSecret Value:", secret.value, "\r\n");
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});