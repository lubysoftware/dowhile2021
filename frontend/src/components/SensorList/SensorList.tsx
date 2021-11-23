import React from 'react';
import { Space } from 'antd';
import './SensorList.css';
import axios from 'axios';
import Sensor from '../Sensor/Sensor';

export default class SensorList extends React.Component<{}, {
  items: any[]
}> {

  state = {
    items: []
  }

  componentDidMount() {
    this.list()
  }

  list () {
    axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}/list`)
      .then(res => {
        const items = res.data;
        this.setState({ items });
        setTimeout(() => this.list(), 2000)
      })
  }

  render() {
    return <Space >
      {this.state.items.map((item: any) => (
        <Sensor sensor={item} />
      ))}
    </Space>
  }
}

