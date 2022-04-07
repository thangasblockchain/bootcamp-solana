fn main() {
    // slices 
    let sample_slice = String::from("hello thanga  ");

    println!("{}",&sample_slice);
    slice_test(&sample_slice);
}

fn slice_test(s : &String) {
    let _bytes = s.as_bytes();
    println!("below is the bytes for h e l l o  t h a n g a  ");
    println!("{:?}",_bytes);

    // // iter() -> iterate the bytearray _bytes()
    // // enumerate -> going to return the index _index and refrence to the item for the item_ref_to_index
    // for (_index,&item_ref_to_index) in _bytes.iter().enumerate(){
    //     if item_ref_to_index == b' '{
    //         return _index; 
    //     }
    // }
    // s.len();
}