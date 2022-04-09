//
const {
    Connection,
    sendAndConfirmTransaction,
    Keypair,
    Transaction,
    SystemProgram,
    PublicKey,
    TransactionInstruction,
  } = require("@solana/web3.js");
  
  const BN = require("bn.js");
  
  const main = async () => {
    var args = process.argv.slice(2);
    // args[0]: Program ID
    // args[1] (Optional): Counter buffer account
    const programId = new PublicKey(args[0]);
  
    console.log(programId.toBase58());
    const connection = new Connection("http://localhost:8899");
    const feePayer = new Keypair();
  
    console.log("Requesting Airdrop of 1 SOL...");
    await connection.requestAirdrop(feePayer.publicKey, 2e9);
    console.log("Airdrop received");

    // 64 bytes
    const counter = new Keypair();
    console.log("conter is the keypair :",counter);

    // deriving public key from the keypair

    // 32 bytes
    let counterKey = counter.publicKey;

    // creating new txn
    let tx = new Transaction();

    // who is signer ?
    let signers = [feePayer];


    if (args.length > 1) {
      console.log("Found counter address");
      counterKey = new PublicKey(args[1]);
    } else {
      console.log("Generating new counter address");
      let createIx = SystemProgram.createAccount({
        fromPubkey: feePayer.publicKey,
        newAccountPubkey: counterKey,
        /** Amount of lamports to transfer to the created account */

        // getting the amount necessary for rent excemption
        // can check by using solana rent <no_of_bytes>
        lamports: await connection.getMinimumBalanceForRentExemption(8),

        /** Amount of space in bytes to allocate to the created account */
        space: 8,
        /** Public key of the program to assign as the owner of the created account */
        programId: programId,
      });
      signers.push(counter);
      tx.add(createIx);
    }
  
    const idx = Buffer.from(new Uint8Array([0]));

    // the below TransactionInstruction is an object, which is going to be passed to out processor.rs file
    // structure of our process instruction

    //     pub fn process_instruction(
    //     _program_id: &Pubkey,
    //     accounts: &[AccountInfo], 
    //     instruction_data: &[u8],
    // )

    
    let incrIx = new TransactionInstruction({
      keys: [
        {
          pubkey: counterKey,
          isSigner: false,
          isWritable: true,
        }
      ],
      programId: programId,
      data: idx,
    });
    /*
      TransactionInstruction({
        keys: Array<AccountMeta>,
        programId: PublicKey,
        data: Buffer,
      });
    */
    tx.add(incrIx);
  
    let txid = await sendAndConfirmTransaction(connection, tx, signers, {
      skipPreflight: true,
      preflightCommitment: "confirmed",
      confirmation: "confirmed",
    });
    console.log(`https://explorer.solana.com/tx/${txid}?cluster=devnet`);
  
    data = (await connection.getAccountInfo(counterKey)).data;
    count = new BN(data, "le");
    console.log("Counter Key:", counterKey.toBase58());
    console.log("Count: ", count.toNumber());
  };
  
  main()
    .then(() => {
      console.log("Success");
    })
    .catch((e) => {
      console.error(e);
    });