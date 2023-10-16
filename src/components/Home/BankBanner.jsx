import React, { useEffect, useState } from 'react'
import Box from "../../Box"
import hdfc from "../../assests/hdfc-banner.webp"
import paytm from "../../assests/paytm.png"


const BankBanner = () => {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);
  return (
    <Box>
  { matches && ( <div className='bank-banner'>
      <div className='card'>
        <img src={hdfc} alt='hdfc-banner' />
      </div>
      <div className='card'>
        <img src={paytm} alt='paytm-banner' />
      </div>
    </div>)}
  {!matches &&  ( <div className='bank-banner'>
      <div className='card'>
        <img src='https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1696594397/Croma%20Assets/CMS/LP%20Page%20Banners/2023/More%20For%20Your%20Money/October/Festive-%207%20to%2025/ICICI%20-%207%20to%209/PNGs/MHP_2Split__ICICI_7-9_5Oct2023_ylzrks.png?tr=w-360' alt='hdfc-banner' />
      </div>
      <div className='card'>
        <img src='https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1696654195/Croma%20Assets/CMS/LP%20Page%20Banners/2023/More%20For%20Your%20Money/October/Festive-%207%20to%2025/UPI/HP_2Split_UPI_7Oct2023_yjy59d.png?tr=w-480' alt='paytm-banner' />
      </div>
    </div>)}
    </Box>
  )
}

export default BankBanner
