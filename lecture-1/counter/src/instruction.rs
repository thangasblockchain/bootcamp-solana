use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Debug, Clone)]

// we are going to use this in our processor.rs 
pub enum CounterInstructionfromthanga {
    // increment part - enum 
    Increment, // unsigned byte
    New
}