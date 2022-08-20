import * as React from 'react';
import {Button} from 'baseui/button';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
} from 'baseui/modal';
import {useDispatch, useSelector} from "react-redux";
import * as categoryActionType from '../../redux/categoryRedux/categoryActionTypes'
import {deleteCategoryCallerAction} from '../../redux/categoryRedux/categoryActions'
import {Spinner} from "baseui/spinner";

const dataObj = {
    id:''
}

function CategoryAlert({deleteId}) {
    const dispatch = useDispatch()
    const openModel = useSelector((state: any) => state.categoryReducer.openModel);
    const loading = useSelector((state: any) => state.categoryReducer.loading);
    function deleteHandler() {
        dispatch(deleteCategoryCallerAction(dataObj.id = deleteId))
    }

    return (
        <React.Fragment>
            {/*@ts-ignore*/}
            <Modal onClose={()=>dispatch({type:categoryActionType.CATEGORY_REMOVE_MODEL_CLOSE})} isOpen={openModel}>
                <ModalHeader>Do you really want to remove this..?</ModalHeader>
                <ModalBody>
                    This action can't be revers.
                </ModalBody>
                <ModalFooter>
                    {/*@ts-ignore*/}
                    <ModalButton kind="tertiary" onClick={()=> dispatch({type:categoryActionType.IS_ANSWERED_FAILED})}>
                        Cancel
                    </ModalButton>
                    {/*@ts-ignore*/}
                    <ModalButton onClick={()=>deleteHandler()}>
                        {!loading ? (
                            <div>Delete</div>
                        ) : (
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <div style={{marginTop: 4}}>
                                    Loading...!
                                </div>
                                <div style={{marginLeft: 8}}>
                                    {/*@ts-ignore*/}
                                    <Spinner color='#ffffff' size={25} title='Loading...!'/>
                                </div>
                            </div>
                        )}
                    </ModalButton>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

export default CategoryAlert;

