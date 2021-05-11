import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import Intercom from 'react-intercom'
import getConfig from 'next/config'
import { MembershipContext } from '../../membershipContext'
import Membership from './Membership'
import GlobalStyle from '../../theme/globalStyle'
import paywallConfig from '../../paywallConfig'

const config = getConfig().publicRuntimeConfig

export const GlobalWrapper = ({ children }) => {
  const [isMember, setIsMember] = useState('pending')

  const becomeMember = () => {
    return window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()
  }

  useEffect(() => {
    const existingScript = document.getElementById('unlock-protocol')

    if (!existingScript) {
      const script = document.createElement('script')

      script.innerText = `(function(d, s) {
        var js = d.createElement(s),
          sc = d.getElementsByTagName(s)[0];
        js.src="https://paywall.unlock-protocol.com/static/unlock.latest.min.js";
        sc.parentNode.insertBefore(js, sc); }(document, "script"));
      `
      document.body.appendChild(script)

      window.addEventListener('unlockProtocol.status', (event) => {
        console.log(event)

        if (event?.detail?.state === 'locked') {
          setIsMember('no')
        } else if (event?.detail?.state === 'unlocked') {
          setIsMember('yes')
        }
      })
    }

    // Make sure the config is correct!
    window.unlockProtocolConfig = paywallConfig

    // cleanup
    return () => {
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  useEffect(() => {
    ReactGA.initialize(config.googleAnalyticsId)

    /* eslint-disable no-console */
    console.info(`
*********************************************************************
Thanks for checking out Unlock!

We're building the missing payments layer for the web: a protocol
which enables creators to monetize their content with a few lines of
code in a fully decentralized way.

We would love your help.

Jobs: https://unlock-protocol.com/jobs

Open source community: https://github.com/unlock-protocol/unlock

Good first issues: https://github.com/unlock-protocol/unlock/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22

Get in touch: hello@unlock-protocol.com

Love,

The Unlock team
*********************************************************************`)
    /* eslint-enable no-console */
  }, [])

  return (
    <MembershipContext.Provider
      value={{
        isMember,
        becomeMember,
      }}
    >
      <Membership isMember={isMember} becomeMember={becomeMember} />
      <GlobalStyle />
      {children}
      <Intercom appID={config.intercomAppId} />
    </MembershipContext.Provider>
  )
}
