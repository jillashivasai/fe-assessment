import React, { useState,useEffect } from 'react';
import Accordion from './Accordion';
import './usercard.css';
import { MdModeEdit,MdDeleteOutline } from "react-icons/md";
import { BsXCircle } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";

const UserCard = ({ eachUser, onDelete }) => {
  const { id, first, last, dob, gender: initialGender, email: initialEmail, picture, country: initialCountry, description: initialDescription } = eachUser;
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...eachUser });
  const [email, setEmail] = useState(initialEmail);
  const [description, setDescription] = useState(initialDescription);
  const [age, setAge] = useState(calculateAge(dob));
  const [gender, setGender] = useState(initialGender);
  const [country, setCountry] = useState(initialCountry);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [openAccordions, setOpenAccordions] = useState([]);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [originalDetails, setOriginalDetails] = useState({});

  useEffect(() => {
    // Save the original user details when component mounts
    setOriginalDetails({
      email: initialEmail,
      description: initialDescription,
      age: calculateAge(dob),
      gender: initialGender,
      country: initialCountry
    });
  }, []);

  useEffect(() => {
    // Check if user details have changed
    const detailsChanged = (
      editedUser.email !== originalDetails.email ||
      editedUser.description !== originalDetails.description ||
      editedUser.age !== originalDetails.age ||
      editedUser.gender !== originalDetails.gender ||
      editedUser.country !== originalDetails.country
    );
    setIsSaveEnabled(detailsChanged);
  }, [editedUser, originalDetails]);


  // Calculate age based on the date of birth
  function calculateAge(dob) {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    
    if (age > 18) {
      console.log("Edited User Data:", editedUser);
      setEmail(editedUser.email);
      setDescription(editedUser.description);
      setAge(calculateAge(editedUser.dob));
      setGender(editedUser.gender);
      setCountry(editedUser.country);
    }
    setIsEditing(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  }

  function handleAge(e) {
    setAge(e.target.value)
  }

  function confirmDelete() {
    setShowDeleteModal(true);
  }

  function handleDelete() {
    onDelete(id);
    setShowDeleteModal(false);
  }

  function cancelDelete() {
    setShowDeleteModal(false);
  }

  function handleClose(){
    setIsEditing(false);
  }

  function handleAccordionToggle(accordionId) {
    setOpenAccordions((prevAccordions) => {
      if (prevAccordions.includes(accordionId)) {
        return prevAccordions.filter((id) => id !== accordionId);
      } else {
        return [...prevAccordions, accordionId];
      }
    });
  }

  const renderEditing = () => {
    if (isEditing && age > 18) {
      return (
      <div className=' editing '>
      <div className='rows'>
      <div>
        <p className='bold'>Age </p>
        <p><input type="text" name="age"  id='age' value={editedUser.age} onChange={handleChange} className='input-field'/></p>
        </div>
        <div>
        <p className='bold'>Gender</p>
        <p>
        <select name="gender" id='gender' value={editedUser.gender} onChange={handleChange} className='input-field'>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Transgender">Transgender</option>
          <option value="Rather not to say">Rather not to say</option>
          <option value="Other">Other</option>
        </select>
        </p>
        </div>
        <div>
        <p className='bold'>Country</p>
        <p><input type='text' name="country" id='country' value={editedUser.country} onChange={handleChange} className='input-field'/></p>
        </div>
        </div>
        <div>
        <div>
        <p className='bold'>Description</p>
        <p><textarea name="description"  value={editedUser.description} onChange={handleChange} className='textarea-field'/></p>
        </div>
        <div className='flex-end'>
              <button onClick={handleSave} disabled={!isSaveEnabled} className='save-button'><BsCheckCircle/></button>
              <button onClick={handleClose} className='close'><BsXCircle/></button>
          </div>
        </div>
        </div>
        
      );
    }
    return null;
  }



  const editingDisabled=()=>{
    return (
      <div className='padding card'>
      <div className=''>
        <p className='bold'>Age </p>
        <p>{age} years</p>
        </div>
        <div>
        <p className='bold'>Gender</p>
        <p> {gender}</p>
        </div>
        <div>
        <p className='bold'>Country</p>
        <p>{country}</p>
        </div>
        <div>
        <p className='bold'>Description</p>
        <p>{description}</p>
        </div>
        <div className='flex-end'>
          <button onClick={handleEdit} className='edit-button' aria-labelledby='edit'><MdModeEdit /></button>
          <button onClick={confirmDelete} className='delete-button'><MdDeleteOutline/></button>
        </div>
      </div>
    )
  }

  return (
    <li>
      <Accordion title={`${first} ${last}`} image={picture}  handleAccordionToggle={handleAccordionToggle} isOpen={openAccordions.includes(id)} id={id}>
        <div className='center'>
            {isEditing ? renderEditing() : editingDisabled()}
            {showDeleteModal && (
              <div className="modal">
                <div className="modal-content">
                  <p className='text-center'>Are you sure you want to delete {first} {last}?</p>
                  <div className="modal-buttons">
                    <button onClick={handleDelete} className='modal-delete'>Delete</button>
                    <button onClick={cancelDelete} className='modal-cancel'>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
      </Accordion>
    </li>
  );
};

export default UserCard;
