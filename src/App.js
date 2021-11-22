import { Routes, Route } from "react-router-dom";
import { UseAuth } from "./Hooks/UseAuth";
import PrivateRoute from "./Routes/PrivateRoute";

import Admin from "./Views/Admin/Layouts/Admin";
import AdminHome from "./Views/Admin/Pages/AdminHome";

import {
    ConsumerOrders, ConsumerProfile,
    ConsumerDashboard, ConsumerLayout, ConsumerCreateOrder,
    ConsumerUploadPrescirption, ConsumerHealthSearching, ConsumerCreateAppoinment, ConsumerAppoinments, ConsumerPaymentRequest, ConsumerGivePayment
} from "./Views/Consumer/Pages/ConsumerPages";

import {
    DispensaryLayout,
    DispensaryDashboard,
    DispensaryInventory,
    DispensaryOrders,
    DispensaryProfile,
    DispensaryCreateOrder,
    DispensaryPrescriptions,
    DispensaryInvetoryCateogryAll,
    DispensaryInvetoryCateogryCreate,
    DispensaryInvetoryDrugAll,
    DispensaryInvetoryDrugCreate,
    DispensaryInvetoryManufacturerAll,
    DispensaryInvetoryManufacturerCreate,
    DispensaryInvetoryStorageAll,
    DispensaryInvetoryStorageCreate,
    DispensaryInvetorySupplierAll,
    DispensaryInvetorySupplierCreate,
    InventoryLayout,
    DispensaryInvetoryDrugLayout,
    DispensaryInvetoryCateogryLayout,
    DispensaryInvetoryCateogryEdit,
    DispensaryInvetoryCateogryDetails,
} from "./Views/Dispensary/Pages/DispensaryPages";

import NotFound from "./Views/Errors/NotFound";
import Login from "./Views/Frontend/auth/Login";
import Signup from "./Views/Frontend/auth/Signup";
import Frontend from "./Views/Frontend/Layouts/Frontend";

import {
    PhysicianLayout,
    PhysicianDashboard,
    PhysicianCreatePrescription,
    PhysicianPrescriptions,
    PhysicianProfile,
    PhysicianStartCounciling,
} from "./Views/Physician/Pages/PhysicianPages";

function App() {
    const { checked_auth } = UseAuth();
    return (
        <div>
            {checked_auth &&
                <Routes>
                    {/* public routes */}
                    <Route path="/" element={<Frontend />}>
                        <Route index element={<Login />} />
                        <Route path="signin" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />

                    {/* admin routes */}
                    <Route path="/dashboard" element={<PrivateRoute><Admin /></PrivateRoute>}>
                        <Route index element={<AdminHome />} />
                    </Route>

                    {/* Consumer routes */}
                    <Route path="/consumer" element={<PrivateRoute><ConsumerLayout /></PrivateRoute>}>
                        <Route index element={<ConsumerDashboard />} />
                        <Route path="orders" element={<ConsumerOrders />} />
                        <Route path="profile" element={<ConsumerProfile />} />
                        <Route path="create-order" element={<ConsumerCreateOrder />} />
                        <Route path="upload-prescription" element={<ConsumerUploadPrescirption />} />
                        <Route path="health-searching" element={<ConsumerHealthSearching />} />
                        <Route path="create-appoinment" element={<ConsumerCreateAppoinment />} />
                        <Route path="appoinments" element={<ConsumerAppoinments />} />
                        <Route path="payment-requests" element={<ConsumerPaymentRequest />} />
                        <Route path="payment" element={<ConsumerGivePayment />} />
                    </Route>

                    {/* Dispensary routes */}
                    <Route path="/dispensary" element={<PrivateRoute><DispensaryLayout /></PrivateRoute>}>
                        <Route index element={<DispensaryDashboard />} />

                        <Route path="inventory" element={<InventoryLayout />} >

                            <Route path="categories" element={<DispensaryInvetoryCateogryLayout/>}>
                                <Route index element={<DispensaryInvetoryCateogryAll/>}/>
                                <Route path="create" element={<DispensaryInvetoryCateogryCreate/>}/>
                                <Route path="edit/:id" element={<DispensaryInvetoryCateogryEdit/>}/>
                                <Route path="details/:id" element={<DispensaryInvetoryCateogryDetails/>}/>
                            </Route>

                            <Route path="drugs" element={<DispensaryInvetoryDrugLayout/>}>
                                <Route index element={<DispensaryInvetoryDrugAll/>}/>
                                <Route path="create" element={<DispensaryInvetoryDrugCreate/>}/>
                            </Route>

                            <Route path="manufactures" element={<DispensaryInvetoryManufacturerAll/>}>
                                <Route path="create" element={<DispensaryInvetoryManufacturerCreate/>}/>
                            </Route>
                            <Route path="storages" element={<DispensaryInvetoryStorageAll/>}>
                                <Route path="create" element={<DispensaryInvetoryStorageCreate/>}/>
                            </Route>
                            <Route path="suppliers" element={<DispensaryInvetorySupplierAll/>}>
                                <Route path="create" element={<DispensaryInvetorySupplierCreate/>}/>
                            </Route>
                        </Route>

                        <Route path="orders" element={<DispensaryOrders />} />
                        <Route path="create-order" element={<DispensaryCreateOrder />} />
                        <Route path="prescriptions" element={<DispensaryPrescriptions />} />
                        <Route path="profile" element={<DispensaryProfile />} />
                    </Route>

                    {/* Physician routes */}
                    <Route path="/physician" element={<PrivateRoute><PhysicianLayout /></PrivateRoute>}>
                        <Route index element={<PhysicianDashboard />} />
                        <Route path="create-prescription" element={<PhysicianCreatePrescription />} />
                        <Route path="prescriptions" element={<PhysicianPrescriptions />} />
                        <Route path="profile" element={<PhysicianProfile />} />
                        <Route path="councilling" element={<PhysicianStartCounciling />} />
                    </Route>

                </Routes>

            }
        </div>
    );
}

export default App;
