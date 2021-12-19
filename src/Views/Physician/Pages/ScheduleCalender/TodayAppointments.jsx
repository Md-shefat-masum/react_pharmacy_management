import * as React from 'react';
import {
    Appointments,
    // AppointmentTooltip,
    Scheduler,
    WeekView,

    Toolbar,
    DateNavigator,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';
import appointments from './ScheduleDemoData';
import axios from 'axios';
import { ViewState } from '@devexpress/dx-react-scheduler';

const styles = theme => ({
    button: {
        color: theme.palette.background.default,
        padding: 0,
    },
    text: {
        paddingTop: theme.spacing(1),
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
});

const AppointmentBase = ({
    children,
    data,
    onClick,
    classes,
    toggleVisibility,
    onAppointmentMetaChange,
    ...restProps
}) => (
    <Appointments.Appointment
        {...restProps}
    >
        <React.Fragment>
            <IconButton
                className={classes.button}
                onClick={({ target }) => {
                    window.navigate(`/physician/appoinment-details/${data.id}`);
                    toggleVisibility();
                    onAppointmentMetaChange({ target: target.parentElement.parentElement, data });
                }}
            >
                <InfoIcon fontSize="small" />
            </IconButton>
            {children}
        </React.Fragment>
    </Appointments.Appointment>
);

const Appointment = withStyles(styles, { name: 'Appointment' })(AppointmentBase);

export default class TodayAppointments extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: appointments,
            loaded: false,
            currentDate: new Date().toISOString(),
            // visible: false,
            // appointmentMeta: {
            //     target: null,
            //     data: {},
            // },
        };

        this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };

        this.componentDidMount = () => {
            axios.get(`${process.env.REACT_APP_API_LINK}/appoinment/doctor-approve-appoinments-for-calender`)
                .then(res => {
                    // console.log(res.data);
                    this.setState({ data: res.data, loaded: true })
                })
        }

        this.toggleVisibility = () => {
            const { visible: tooltipVisibility } = this.state;
            this.setState({ visible: !tooltipVisibility });
        };

        this.onAppointmentMetaChange = ({ data, target }) => {
            this.setState({ appointmentMeta: { data, target } });
        };

        this.myAppointment = this.myAppointment.bind(this);
    }

    myAppointment(props) {
        return (
            <Appointment
                {...props}
                toggleVisibility={this.toggleVisibility}
                onAppointmentMetaChange={this.onAppointmentMetaChange}
            />
        );
    }

    doctor_start_hour = () => {
        let start = window.user?.doctor_info?.time_diff_from_doctor_start_time?.converted_start_time;
        return parseInt(start);
    }

    doctor_end_hour = () => {
        let end = window.user?.doctor_info?.time_diff_from_doctor_start_time?.converted_end_time;
        return parseInt(end);
    }

    render() {
        const {
            data,
            currentDate,
            loaded
            // appointmentMeta,
            // visible,
        } = this.state;

        return loaded && (
            <Paper>
                <Scheduler
                    data={data}
                    // height={660}
                >
                    
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={this.currentDateChange}
                    />
                    <WeekView
                        startDayHour={this.doctor_start_hour()}
                        endDayHour={this.doctor_end_hour()}
                    />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />

                    <Appointments
                        appointmentComponent={this.myAppointment}
                    />

                    {/* <AppointmentTooltip
                        showCloseButton
                        visible={visible}
                        onVisibilityChange={this.toggleVisibility}
                        appointmentMeta={appointmentMeta}
                        onAppointmentMetaChange={this.onAppointmentMetaChange}
                    /> */}
                </Scheduler>
            </Paper>
        );

    }
}
