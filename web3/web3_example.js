// get account info
// import * as web3 from '@solana/web3.js';
// an example for solana web3
const web3 = require('@solana/web3.js');
console.log(web3);
(async () => {
    // Connect to cluster
    var connection = new web3.Connection(
      web3.clusterApiUrl('devnet'),
      'confirmed',
    );
  
    // Generate a new wallet keypair and airdrop SOL
    var wallet = web3.Keypair.generate();
    console.log("generated wallet -",wallet.publicKey);

    var airdropSignature = await connection.requestAirdrop(
      wallet.publicKey,
      web3.LAMPORTS_PER_SOL,
    );
  
    //wait for airdrop confirmation
    await connection.confirmTransaction(airdropSignature);
  
    // get account info
    // account data is bytecode that needs to be deserialized
    // serialization and deserialization is program specific
    let account = await connection.getAccountInfo(wallet.publicKey);
    console.log("details",account);

    // USDC
    const uri = "http://api.mainnet-beta.solana.com";
    const usdc = "FptMsmBPXgDxtAwRDBYEFMf77LL3xAkcJZguiQHLo1Va";
    let usdc_details = await connection.getAccountInfo(usdc);
    console.log("usdc details -",usdc_details);
  })();