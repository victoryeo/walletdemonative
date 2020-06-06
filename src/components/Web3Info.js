import React, {Component} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import {connect} from "react-redux"
import { STPupdateAccounts } from '../actions/actions.js'
import * as Utils from '../web3/utils'

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
        clearInterval(web3Returned);
        this.web3 = this.props.web3.web3Instance
            //console.log(this.web3)
        Utils.checkNetwork(this.web3).then((res) => {
            console.log(res)
            if (res == 'local' || res == 'rinkeby') {
              this.setState({
                isConnected: true,
             })
            }
        })
        try {
          console.log('vic')          
          Utils.checkBalance(this.web3, this.props.STPupdateAccounts);

            //console.log(this.props.account)
        } catch (err) {
          console.error('error', err);
        }

      }
    },1000)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Ethereum Wallet demo</Text>
        <Text>{this.state.isConnected?'Connected to rinkeby node':'Not Connected'}</Text>
        <Text>{this.props.account}</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
        web3: state.web3,
        account: state.reducers.account,
})

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    STPupdateAccounts: (account0) => dispatch(STPupdateAccounts(account0)),
  };
};

export default connect (
  mapStateToProps,
  mapDispatchToProps,
) (Web3Info)

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#9999',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
