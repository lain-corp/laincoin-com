async function main() {
  const [deployer] = await ethers.getSigners();

  const initialSupply = ethers.utils.parseUnits("100000000000", 18); // 100B tokens
  const logoURI = "https://laincoin.com/gnosis.png"; // Replace this with your actual IPFS hash

  const LainCoin = await ethers.getContractFactory("LainCoin");
  const token = await LainCoin.deploy(initialSupply, logoURI);
  await token.deployed();

  console.log("LainCoin deployed to:", token.address);
  console.log("Deployer:", deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

