import bycrpt from 'bcryptjs';

export const hashPassword = async (password : string) => {
    return await bycrpt.hash(password, 10);
};

export const comparePassword = async (password : string , hashedPassword : string) => {
    return await bycrpt.compare(password, hashedPassword);
}

// information
// 1. hashedPassword contains the salt and the cost factor inside it is not just a random string — it includes all the info needed to validate the input.
// 2. this hashedPassword hashed using bycrpt library with 10 cost factor, this cost factor is the number of iterations that the algorithm will run to hash the password. The higher the cost factor, the more secure the hash will be, but it will also take longer to compute. A cost factor of 10 is a good balance between security and performance for most applications.
// 3. this make sure the actuall plain password will not be stored in the database

// How these things work:
// 1. When a user registers, their password is hashed using the hashPassword function and stored in the database as hashedPassword.
// 2. when do hash password the bycrpt library will generate a random salt (random string used to make each password hash unique ) that contain cost factor (10) and actual password
// 3. the hashedPassword will store in the database as random string so the plain pass or real password will not reveal
// 4. When user do login then they input username and pass system will check username, if right then system will check the password  usecompare password
// 5. bcrypt will compare automatic by Re-hashes using same aglorithm,cost and salt that was used to create the original hash. If the re-hashed password matches the original hash, it means the password is correct. If not, it means the password is incorrect.

// FYI
// 1. bcrypt is store salt or randoms string not only based one 1 aglorithm so eventhough different user but input same password it still generate random string 
// 2. plain text will not stored in anywhere so basicaly if user forget the pass they will get token to reupdate the password but the old password will never known