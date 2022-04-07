// first place where we receive data
// entrypoint is the first place for data

use crate::processor::Processor;

// solana_program from cargo.toml

use solana_program::{account_info::AccountInfo, entrypoint::ProgramResult, msg, pubkey::Pubkey};

#[cfg(not(feature = "no-entrypoint"))]
use solana_program::entrypoint;
#[cfg(not(feature = "no-entrypoint"))]
entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey, // pubkey of the program
    accounts: &[AccountInfo], // account to store the state - Data to read/write
    instruction_data: &[u8], // byte array (parameter input u8 - 8 bit - 1 byte)
) -> ProgramResult {
    msg!(
        "process_instruction: program id {}: {} accounts, data={:?}",
        program_id,
        accounts.len(),
        instruction_data
    );

    Processor::process_instruction(program_id, accounts, instruction_data)
}
