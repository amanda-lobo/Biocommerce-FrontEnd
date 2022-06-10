import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import Produto from "../../../models/Produto";
import { buscaId, deleteId } from "../../../services/Service";
import "./DeletarProduto.css";
import { toast } from "react-toastify";

function DeletarProduto() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [token, setToken] = useState("token");

  const [produtos, setProdutos] = useState<Produto>();

  useEffect(() => {
    if (token === "") {
      toast.error('Você precisa estar logado', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
    });
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      findById(id);
    }
  }, [id]);

  async function findById(id: string) {
    buscaId(`/produto/${id}`, setProdutos, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function sim() {
    navigate("/produto");

    await deleteId(`/produto/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    toast.success("Produto deletado com sucesso", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
      progress: undefined,
  });
  }

  function nao() {
    navigate("/produto");
  }

  return (
    <>
      <Box m={2}>
        <Card variant="outlined">
          <CardContent>
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar este Produto ?
              </Typography>
              <Typography color="textSecondary">{produtos?.nome}</Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
              <Box mx={2}>
                <Button
                  onClick={sim}
                  variant="contained"
                  className="marginLeft"
                  size="large"
                  color="primary"
                >
                  Sim
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={nao}
                  variant="contained"
                  size="large"
                  color="secondary"
                >
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
