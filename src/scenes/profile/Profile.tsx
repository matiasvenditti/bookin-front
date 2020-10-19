import React from 'react';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
import {Typography, Tabs, Tab, AppBar, Grid} from '@material-ui/core';
import './Profile.css'
import {DeleteUserModal} from './DeleteUserModal';
import {withRouter} from 'react-router-dom';
import {RequestStatus} from '../../model/consts/RequestStatus';
import {EditVar} from '../../model/consts/EditVar';
import {User} from '../../model';
import {Gender} from '../../model/Gender';
import {SessionService, UserService} from '../../services';
import HoverableAvatar from '../../components/Photo/HoverableAvatar/HoverableAvatar';
import {dummyAvatar} from '../../assets';
import {PhotoUtils} from '../../utils';
import ReviewService from "../../services/ReviewService";
import ReviewCard from "../../components/Cards/ReviewCard/ReviewCard";
import {DeleteReviewModal} from "../review/DeleteReviewModal";
import {RouteComponentProps} from "react-router";
import {ReviewWithBookDTO} from "../../model/Review";


interface ProfileProps extends RouteComponentProps {
    editProfileCallback(editProfileStatus: RequestStatus): void,
    onLoadErrorCallback(): void,
    deleteProfileCallback(deleteProfileStatus: RequestStatus): void,
}

interface ProfileState {
    currentTab: string,
    editProfileMode: boolean,
    getUserDataStatus: RequestStatus,
    editVariable: EditVar,
    updateStatus: any,
    deleteStatus: any,
    deleteModalShow: boolean,
    data: User,
    reviews: ReviewWithBookDTO[],
    showDelete:boolean,
    currentId: number,
    reviewDeleteStatus: RequestStatus,
}

class Profile extends React.Component<ProfileProps, ProfileState> {
    constructor(props: ProfileProps) {
        super(props);
        this.state = {
            currentTab: 'profile',
            editProfileMode: false,
            getUserDataStatus: RequestStatus.NONE,
            reviewDeleteStatus: RequestStatus.NONE,
            data: {
                id: -1,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                gender: Gender.A    ,
                photo: null,
            },
            deleteModalShow: false,
            updateStatus: RequestStatus.NONE,
            deleteStatus: RequestStatus.NONE,
            editVariable: EditVar.PASSWORD,
            reviews: [],
            showDelete:false,
            currentId: -1,
        }
    }

    _getUserData() {

        const result: Promise<any> = Promise.all([
            UserService.getUserData(),
        ]);
        result
            .then((response:User) => {
                this.setState({
                data: {
                    ...response[0].data,
                    photo: PhotoUtils.getPhotoFromBytearray(response[0].data.photo),
                },
                getUserDataStatus: RequestStatus.SUCCESS,
            })
                this._getUserReviews(response[0].data.id)

            })
            .catch(() => {
                this.setState({...this.state, getUserDataStatus: RequestStatus.ERROR})
            })
    }
    _getUserReviews(id:number){
        ReviewService.getReviewsFromUser(id)
            .then((response) => this.setState({reviews: response.data}
            ))
            .catch(() => {
                this.setState({...this.state, getUserDataStatus: RequestStatus.ERROR})
            })
    }

    componentDidMount() {
        this.setState({...this.state, getUserDataStatus: RequestStatus.LOADING});
        this._getUserData();
    }

    handleChangeTab = (e: any, newValue: any) => {
        this.setState({...this.state, currentTab: newValue});
    }

    handleCancel = () => {
        this.setState({...this.state, editProfileMode: false, deleteModalShow: false})
    };

    handleDeleteConfirm = () => {
        this.setState({...this.state, deleteStatus: RequestStatus.LOADING});
        UserService.deleteProfile(this.state.data.id)
            .then(() => {
                // TODO call ToastContainer (context feature to be implemented)
                this.setState({...this.state, deleteStatus: RequestStatus.SUCCESS});
                SessionService.logout();
                this.props.history.push('/');
            })
            .catch(() => {
                this.setState({...this.state, deleteStatus: RequestStatus.ERROR});
            });
    }

    handleUpdatePhoto = (photo: File) => {
        this.handleUpdate(this.state.data, photo);
    }
    handleUpdateValues = (values: User) => this.handleUpdate(values, this.state.data.photo);

    handleUpdate = (values: User, photo: File) => {
        this.setState({...this.state, updateStatus: RequestStatus.LOADING});
        UserService.updateProfile(this.state.data.id, values, photo)
            .then(() => {
                this.setState({...this.state, updateStatus: RequestStatus.SUCCESS, editProfileMode: false});
                this.props.editProfileCallback(RequestStatus.SUCCESS);
                this._getUserData();
            })
            .catch(() => {
                this.setState({...this.state, updateStatus: RequestStatus.ERROR});
                this.props.editProfileCallback(RequestStatus.ERROR);
            });
    }

    render() {
        const {currentTab, deleteStatus, deleteModalShow} = this.state;
        const {firstName, lastName} = this.state.data;
        return (
            <div className='route-container'>
                <div className='card-container'>
                    <div className='image-name-container'>
                        <HoverableAvatar
                            src={this.state.data.photo || dummyAvatar}
                            id=''
                            maxSize={100000}
                            loading={this.state.updateStatus === RequestStatus.LOADING}
                            onChange={this.handleUpdatePhoto}
                            onLoadError={this.props.onLoadErrorCallback}
                        />
                        <Typography align='center' variant='h4'>{firstName + ' ' + lastName}</Typography>
                    </div>
                    <AppBar position='static'>
                        <Tabs value={currentTab} onChange={this.handleChangeTab} aria-label='simple tabs example'>
                            <Tab label='Mi perfil' id='tab-profile-view-edit' value='profile'/>
                            <Tab label='Mis reseñas' id='tab-profile-reviews' value='reviews'/>
                        </Tabs>
                    </AppBar>
                    {currentTab === 'profile' && this.renderProfile()}
                    {currentTab === 'reviews' && this.renderReviews()}
                    <DeleteUserModal
                        open={deleteModalShow}
                        loading={deleteStatus === RequestStatus.LOADING}
                        onConfirm={this.handleDeleteConfirm}
                        onCancel={this.handleCancel}
                    />
                </div>
            </div>
        );
    }

    /**
     * Renders ProfileView or ProfileEdit
     */
    renderProfile() {
        const {editProfileMode, data, editVariable, getUserDataStatus} = this.state;
        if (editProfileMode) {
            return (
                <ProfileEdit
                    loading
                    error
                    data={data}
                    editVariable={editVariable}
                    onSubmit={this.handleUpdateValues}
                    onCancel={this.handleCancel}
                />
            );
        } else {
            return (
                <ProfileView
                    data={data}
                    loading={getUserDataStatus === RequestStatus.LOADING}
                    error={getUserDataStatus === RequestStatus.ERROR}
                    onEdit={(type) => this.setState({...this.state, editProfileMode: true, editVariable: type})}
                    // onChangePassword={() => this.setState({...})}
                    onChangePassword={() => console.log('on change password recibed (WIP)')}
                    onDeleteUser={() => this.setState({...this.state, deleteModalShow: true})}
                />
            );
        }
    }

    handleConfirmDelete = () => this.deleteReview(this.state.currentId);
    handleDeleteCancel = () => this.setState({showDelete: false});

    deleteReview = (id: number) => {
        this.setState({reviewDeleteStatus: RequestStatus.LOADING});
        ReviewService.deleteReview(id)
            .then(() => {
                this.setState({reviewDeleteStatus: RequestStatus.SUCCESS});
                window.location.reload();
            })
            .catch(() => {
                this.setState({reviewDeleteStatus: RequestStatus.ERROR});
            });
        this.handleDeleteCancel();
    }


    renderReviewDelete() {
        const {showDelete, reviewDeleteStatus} = this.state;
        if (showDelete) return (
            <DeleteReviewModal
                open={showDelete}
                loading={reviewDeleteStatus === RequestStatus.LOADING}
                onConfirm={this.handleConfirmDelete}
                onCancel={this.handleDeleteCancel}
            />
        )
    }


    renderReviews() {
        const {data, reviews} = this.state;
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="flex-start"
                    spacing={3}
                    className='reviews-container'
                >

                    {reviews.map((rev, j) => {
                        return (
                            <Grid item xs sm={6} key={j}>
                                <div key={'review-view-item-' + j}>
                                    <ReviewCard
                                        id={rev.id}
                                        stars={rev.stars}
                                        comment={rev.comment}
                                        reviewBookId={rev.bookId}
                                        reviewCreatorUserID={data.id} // Es el creador el del perfil asi que le pasamos el mismo
                                        currentUser={data}
                                        isProfile={true}
                                        isAdmin={true} //Le mandamos isAdmin true asi puede editar todas sus reviews, podes mandarle false tambien, total el chequeo que tiene reviewcard se fija si es una review de el.
                                        reviewDisplayString={rev.bookTitle} // Le pasamos el titulo en vez del nombre
                                        handleDelete={(reviewId: number) => {
                                            this.setState({...this.state, showDelete: true, currentId: reviewId,})
                                        }
                                        }
                                        handleEdit={() => null} //TODO
                                    />
                                </div>
                            </Grid>
                        )
                    })}
                </Grid>
                {this.renderReviewDelete()}
            </div>
        )
    }
}


export default withRouter(Profile);
