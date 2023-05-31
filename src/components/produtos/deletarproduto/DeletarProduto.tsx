import React, { useEffect, useState } from 'react'
import { Typography, Button, Card, CardActions, CardContent } from "@material-ui/core"
import { Box } from '@mui/material';
import './DeletarProduto.css';
import { useNavigate, useParams } from 'react-router-dom';
// import useLocalStorage from 'react-use-localstorage';
import { buscaId, deleteId } from '../../../services/Service';
import { toast } from 'react-toastify';
import Produto from '../../../models/Produto';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';

function DeletarProduto() {

    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    // const [token, setToken] = useLocalStorage('token');
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    const [produto, setProdutos] = useState<Produto>()

    useEffect(() => {
        if (token == "") {
            toast.error('Você precisa estar logado', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
            navigate("/login")

        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/produtos/${id}`, setProdutos, {
            headers: {
                'Authorization': token
            }
        })
    }

    function sim() {
        deleteId(`/produtos/${id}`, {
            headers: {
                'Authorization': token
            }
        });
        alert('Produto deletado com sucesso');
        navigate('/admin')
        // toast.success('Produto deletada com sucesso', {
        //     position: "top-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: false,
        //     draggable: false,
        //     theme: "colored",
        //     progress: undefined,
        // });
    }

    function nao() {
        navigate('/admin')
    }

    return (
        <>
            <Box m={2}>
                <Card variant="outlined" >
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar o produto:
                            </Typography>
                            <Typography color="textSecondary" >
                                {produto?.nome}
                            </Typography>
                        </Box>

                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                            <Box mx={2}>
                                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                                    Sim
                                </Button>
                            </Box>
                            <Box>
                                <Button onClick={nao} variant="contained" size='large' color="secondary">
                                    Não
                                </Button>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}
export default DeletarProduto;