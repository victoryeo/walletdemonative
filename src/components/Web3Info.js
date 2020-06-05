import React, {Component} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import {connect} from "react-redux"
import { STPupdateAccounts } from '../actions/actions.js'

class Web3Info extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isConnected: false,
      account: '',
    };
    this.web3 = null
    this.networktype = 'none'

    const web3Returned = setInterval(() => {
      if (this.props.web3 != null) {
        console.log(this.props.web3)
        clearInterval(web3Returned);
        this.web3 = this.props.web3.web3Instance;
      }
    },1000)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Ethereum Wallet demo</Text>
        <Text>{this.props.web3.web3Instance._provider.timeout}</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
        web3: state.web3,
})

export default connect (
  mapStateToProps,
  {
    STPupdateAccounts,
  }
) (Web3Info)

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#9999',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
