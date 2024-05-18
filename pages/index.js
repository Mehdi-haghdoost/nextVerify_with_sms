import { useRouter } from "next/router";
import React, { useState } from "react";

function Index() {

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSend, setIsCodeSend] = useState();

  const router = useRouter()

  const sendCode = async (event) => {
    event.preventDefault()

    const res = await fetch('/api/sms/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone })
    })

    if (res.status === 201) {
      setIsCodeSend(true)
    }
  }

  const verifyCode = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/sms/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone, code })
    })

    if (res.status === 200) {

      alert('code is correct :))')

      router.replace('/dashboard')

    } else if (res.status === 410) {

      alert('code is expired !! :))')
    } else if (res.status === 409) {

      alert('code is not correct !!')
    }
  }


  return (
    <div className="box">
      <h1 align="center">Login Form</h1>
      <form role="form" method="post">
        {
          isCodeSend ?
            <>
              <div className="inputBox">
                <input type="text" autoComplete="off" required
                  value={code}
                  onChange={event => setCode(event.target.value)}
                />
                <label>Code</label>
              </div>
              <input type="submit" className="register-btn" value="Verify Code" onClick={verifyCode} />
            </> :
            <>
              <div className="inputBox">
                <input type="text" autoComplete="off" required
                  value={phone}
                  onChange={event => setPhone(event.target.value)}
                />
                <label>Phone Number</label>
              </div>
              <input type="submit" className="register-btn" value="Send Code" onClick={sendCode} />
            </>
        }
      </form>
    </div>
  );
}

export default Index;
