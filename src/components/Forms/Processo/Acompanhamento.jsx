import { Timeline } from 'flowbite-react'
import React, { useState } from 'react'
import { HiCalendar } from 'react-icons/hi'
import { FaPlus } from 'react-icons/fa'
import { Button, Modal, Label, TextInput, Checkbox } from 'flowbite-react';

export default function Acompanhamento() {
    const [openModal, setOpenModal] = useState("");
    const props = { openModal, setOpenModal };

    const data = [
        {
            date: '25/07/2023',
            title: 'Advogado informou que reconlheu as custas',
            body: ' AGUARD. EDITAL SER EXPEDIDO E DISP. NO DJE'
        },
        {
            date: '22/07/2023',
            title: 'MINUTA ENVIADA POR E-MAIL AO CARTÓRIO PARA CONFERÊNCIA E PUBLICAÇÃO NO DJE.',
            body: ''
        },
        {
            date: '12/07/2023',
            title: 'ORÇAMENTO ENVIADO ÁS 18:18',
            body: ' PREVISÂO DE RECEBIMENTO 25/07'
        },
    ]



    return (
        <div className="mt-6">
            <h5 class="mb-8 mt-4 text-xl font-bold leading-none text-gray-900 dark:text-gray-200">Atualizações do Processo</h5>

            {/* MODAL PARA CADASTRAR ANDAMENTO */}

            <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
                <Modal.Header>Cadastro de andamento</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data:</label>
                        <input
                            type="text"
                            // required
                            // {...registerWithMask("admissao", "datetime", {
                            //     inputFormat: "dd-mm-yyyy",
                            // })}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição do andamento:</label>
                        <textarea
                            type="text"
                            rows={4}
                            // required
                            // {...registerWithMask("admissao", "datetime", {
                            //     inputFormat: "dd-mm-yyyy",
                            // })}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />


                        {/* CHECKBOXES */}


                        <div
                            className="flex max-w-md flex-col gap-4"
                            id="checkbox"
                        >
                            <Label>
                                <strong>Me lembre:</strong>
                            </Label>
                            <div className="flex items-center gap-2">
                                <Checkbox

                                    id="umdia"
                                />
                                <Label
                                    className="flex"

                                >
                                    <p>
                                        1 dia antes
                                    </p>

                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox

                                    id="umdia"
                                />
                                <Label
                                    className="flex"

                                >
                                    <p>
                                        2 dias antes
                                    </p>

                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox

                                    id="umdia"
                                />
                                <Label
                                    className="flex"

                                >
                                    <p>
                                        1 semana antes
                                    </p>

                                </Label>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => props.setOpenModal(undefined)}>Cadastrar</Button>
                    <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>







            {/* TIMELINE */}


            <Timeline>
                <Timeline.Item onClick={() => props.setOpenModal('default')}>
                    <Timeline.Point icon={FaPlus} />

                    <Timeline.Content>

                        <Timeline.Time>
                            Adicionar um novo andamento...
                        </Timeline.Time>
                        <Timeline.Title>

                        </Timeline.Title>
                        <Timeline.Body>

                        </Timeline.Body>

                    </Timeline.Content>
                </Timeline.Item>
                {data.map((item, index) => {
                    return (
                        <Timeline.Item key={index}>
                            <Timeline.Point icon={HiCalendar} />

                            <Timeline.Content key={index}>

                                <Timeline.Time>
                                    {item?.date}
                                </Timeline.Time>
                                <Timeline.Title>
                                    {item?.title}
                                </Timeline.Title>
                                <Timeline.Body>
                                    <p>
                                        {item?.body}
                                    </p>
                                </Timeline.Body>

                            </Timeline.Content>
                        </Timeline.Item>

                    )
                })}
            </Timeline>
        </div>
    )
}
