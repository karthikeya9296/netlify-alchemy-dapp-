import React, { useState } from 'react';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import Ledger from '@ledgerhq/hw-app-eth';
import styles from './LedgerConnect.module.css'; // Adjusted for CSS Modules

const LedgerConnect = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');

  const connectLedger = async () => {
    try {
      const transport = await TransportWebUSB.create();
      const ledger = new Ledger(transport);
      const { address } = await ledger.getAddress("44'/60'/0'/0/0");
      console.log("Connected Address:", address);
      setAddress(address);
      setConnected(true);
    } catch (error) {
      console.error("Failed to connect Ledger:", error);
      setConnected(false);
    }
  };

  return (
    <div className={styles.ledgerConnect}>
      <button onClick={connectLedger} className={styles.connectButton}>
        {connected ? 'Ledger Connected' : 'Connect Ledger'}
      </button>
      {connected && <p className={styles.connectedAddress}>Address: {address}</p>}
    </div>
  );
};

export default LedgerConnect;