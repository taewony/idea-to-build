
import React, { useState } from 'react';
import Modal from '../ui/Modal';

const ModalCard: React.FC<{ title: string; description: string; onShow: () => void }> = ({ title, description, onShow }) => (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/20 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        <div className="mt-auto">
            <button
                onClick={onShow}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
                Show {title.split(' ')[0]}
            </button>
        </div>
    </div>
);

const ModalsShowcase: React.FC = () => {
    const [modalState, setModalState] = useState({
        alert: false,
        confirmation: false,
        information: false,
        form: false,
    });

    const openModal = (type: keyof typeof modalState) => {
        setModalState((prev) => ({ ...prev, [type]: true }));
    };

    const closeModal = (type: keyof typeof modalState) => {
        setModalState((prev) => ({ ...prev, [type]: false }));
    };

    return (
        <div className="w-full">
            <div className="mb-12 border-b border-gray-200 dark:border-gray-700/50 pb-6">
                <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">Modals</h1>
                <p className="mt-2 max-w-2xl text-base text-gray-500 dark:text-gray-400">
                    Modals are dialog boxes that appear on top of the main content to provide critical information or require user interaction.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <ModalCard title="Alert Modal" description="Used to convey important information that the user must acknowledge." onShow={() => openModal('alert')} />
                <ModalCard title="Confirmation Modal" description="Asks the user to confirm a potentially destructive or irreversible action." onShow={() => openModal('confirmation')} />
                <ModalCard title="Information Modal" description="Displays supplementary details or content without requiring an action." onShow={() => openModal('information')} />
                <ModalCard title="Form Modal" description="Allows users to input data or complete a task within a modal dialog." onShow={() => openModal('form')} />
            </div>

            <Modal
                isOpen={modalState.alert}
                onClose={() => closeModal('alert')}
                title="System Alert"
                footer={
                    <button onClick={() => closeModal('alert')} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90">
                        Acknowledge
                    </button>
                }
            >
                <p>Your session is about to expire. Please save your work to avoid data loss.</p>
            </Modal>

            <Modal
                isOpen={modalState.confirmation}
                onClose={() => closeModal('confirmation')}
                title="Delete Item"
                footer={
                    <>
                        <button onClick={() => closeModal('confirmation')} className="rounded-lg bg-slate-200 dark:bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600">
                            Cancel
                        </button>
                        <button onClick={() => closeModal('confirmation')} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                            Delete
                        </button>
                    </>
                }
            >
                <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            </Modal>

            <Modal
                isOpen={modalState.information}
                onClose={() => closeModal('information')}
                title="API Key Information"
            >
                <p>Your API key is a unique identifier used to authenticate requests associated with your project. Keep it secure and do not share it publicly.</p>
                <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-md font-mono text-sm text-slate-700 dark:text-slate-300">
                    <code>XYZ-123-ABC-789-QWE</code>
                </div>
            </Modal>
            
            <Modal
                isOpen={modalState.form}
                onClose={() => closeModal('form')}
                title="Create New User"
                 footer={
                    <>
                        <button onClick={() => closeModal('form')} className="rounded-lg bg-slate-200 dark:bg-slate-700 px-4 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600">
                            Cancel
                        </button>
                        <button onClick={() => closeModal('form')} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90">
                            Create User
                        </button>
                    </>
                }
            >
                <form className="space-y-4">
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="John Doe" />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="you@example.com" />
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ModalsShowcase;
