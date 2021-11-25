const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();
	const waveContractFactory = await hre.ethers.getContractFactory(
		"WavePortal"
	);

	const waveContract = await waveContractFactory.deploy({
		value: hre.ethers.utils.parseEther("0.1"),
	});
	await waveContract.deployed();
	console.log("Contract deployed to:", waveContract.address);

	const balance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log("Contract Balance --> ", hre.ethers.utils.formatEther(balance));

	console.log(owner.address, randomPerson.address);

	let waves;
	let wave = await waveContract.wave("Test wave");
	await wave.wait();

	let randomwave = await waveContract
		.connect(randomPerson)
		.wave("Another test wave");
	await randomwave.wait();

	waves = await waveContract.getAllWaves();

	let allwaves = await waveContract.getWaves();
	console.log(allwaves);
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
