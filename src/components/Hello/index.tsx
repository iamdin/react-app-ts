import React from 'react';
import styles from './index.less';

interface Props {}

const Hello = (props: Props) => {
  return <div className={styles.text}>Hello</div>;
};

export default Hello;