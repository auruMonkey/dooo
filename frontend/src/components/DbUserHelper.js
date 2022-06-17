import React, { useEffect, useState } from "react"
import { Image, Row, Stack, Form, Button, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import NumberFormat from "react-number-format"
import { changeAvatar } from "../actions/uploadActions"
import { updateUserProfile } from "../actions/userActions"
import { addDaysOffCalendar } from "../components/Utils.js"
import DatePicker from "react-datepicker"

import { validateForm } from "../components/Utils"

export const AccountManager = () => {
  
}

