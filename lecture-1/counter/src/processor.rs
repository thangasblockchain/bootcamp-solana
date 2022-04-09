use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

use crate::instruction::CounterInstructionfromthanga;
use crate::state::Counter;

pub struct Processor {}

impl Processor {
    pub fn process_instruction(
        _program_id: &Pubkey, // pubkey / identifier of the program
        accounts: &[AccountInfo], // account to store/modify the state
        instruction_data: &[u8], // byte array - input params
    ) -> ProgramResult {

        // first step - 
        // unpacking the instruction which we are getting from instruction.rs

        let instruction = CounterInstructionfromthanga::try_from_slice(instruction_data)
            .map_err(|_| ProgramError::InvalidInstructionData)?;

        match instruction {
            CounterInstructionfromthanga::Increment => {
                msg!("Instruction: Increment");

                // steps
                // step 1 - un packing the account
                let accounts_iter = &mut accounts.iter();
                let unpack_account = accounts.iter();

                // step 2 - pulling out the account 
                let counter_ai = next_account_info(accounts_iter)?;

                // step 3 - using borsh serialize, pulling data out of counter object
                // we are just de serialize
                // pulling data from account info and packing into object
                let mut counter = Counter::try_from_slice(&counter_ai.data.borrow())?;
                msg!("what does counter object holds ? : {:?}",counter);

                // step 4 - Increment it by 1
            
                counter.count += 1;
                msg!("Updating count {}", counter.count);

                // step 5 - serialize it back
                counter.serialize(&mut *counter_ai.data.borrow_mut())?;
            },
            CounterInstructionfromthanga::New => {
                msg!("its additional");
            }
        }
        Ok(())
    }
}