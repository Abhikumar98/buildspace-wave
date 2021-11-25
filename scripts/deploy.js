const run = async () => {
	const [deployer] = await hre.ethers.getSigners();
	const balance = await deployer.getBalance();

	console.log("Deployer address: ", deployer.address);
	console.log("Deployer balance: ", balance.toString());

	const Token = await hre.ethers.getContractFactory("WavePortal");
	const token = await Token.deploy({
		value: hre.ethers.utils.parseEther("0.2"),
	});

	await token.deployed();

	const contractBalance = await hre.ethers.provider.getBalance(token.address);
	console.log(
		"Contract Balance --> ",
		hre.ethers.utils.formatEther(contractBalance)
	);

	console.log("Contract deployed to : ", token.address);
};

const main = async () => {
	try {
		await run();
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

main();
