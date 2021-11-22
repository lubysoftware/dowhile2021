import React from 'react';
import { Card, Statistic } from 'antd';
import { Button, Popconfirm } from 'antd';
import axios from 'axios';
import './Sensor.module.css';

enum statuses {
  active = 'active',
  inactive = 'inactive'
}

type props = {
  sensor: {
    clientId: string,
    temperature: number,
    status: statuses
  }
}

type state = {
  loading: boolean,
  showPopconfirm: boolean,
}

export default class Sensor extends React.Component<props, state> {

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      showPopconfirm: false
    };
  }

  async confirm() {
    this.setState({ loading: true });
    return axios.post(
        `${process.env.REACT_APP_API_GATEWAY_URL}/status`,
        {
          clientId: this.props.sensor.clientId,
          status: this.props.sensor.status === statuses.inactive ? statuses.active : statuses.inactive
        }
      )
      .then(() => {
        this.setState({
          loading: false,
          showPopconfirm: false
        });
      })

  }

  changePopconfirm() {
    this.setState({
      showPopconfirm: !this.state.showPopconfirm
    });
  }

  get renderOpts (): {
    status: string
    color: string
    btnTitle: string
    btnColor: 'default' | 'primary'
  } {
    return this.props.sensor.status === statuses.active ?
      {
        status: `Ligado`,
        color: '#3f8600',
        btnTitle: 'Desligar',
        btnColor: 'default'
      } :
      {
        status: `Desligado`,
        color: '#d3d3d3',
        btnTitle: 'Ligar',
        btnColor: 'primary'
      }
  }

  render() {
    return <Card title={this.props.sensor.clientId} style={{ width: 300 }}>
            <Statistic
              title={this.renderOpts.status}
              value={this.props.sensor.temperature}
              precision={0}
              valueStyle={{ fontSize: '50px', color: this.renderOpts.color }}
            />
            <Popconfirm
              title="Alterar status?"
              cancelText="Não"
              okText="Sim"
              visible={this.state.showPopconfirm}
              onConfirm={() => this.confirm()}
              onCancel={() => this.changePopconfirm()}
              okButtonProps={{ loading: this.state.loading }}
            >
              <Button 
                type={this.renderOpts.btnColor} 
                size="small" 
                onClick={() => this.changePopconfirm()}>
                  {this.renderOpts.btnTitle}
              </Button>
            </Popconfirm>
          </Card>
  }
}

