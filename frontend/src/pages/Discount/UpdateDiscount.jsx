import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";

const UpdateDiscount = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [discountedItems, setDiscountedItems] = useState([]);
  return (
    <div>UpdateDiscount</div>
  )
}

export default UpdateDiscount