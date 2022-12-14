import React, { useEffect, useState } from "react";
import { handleNewRoom } from "@/lib/functions";
import { useConfigurationStore, useUserConfiguration } from "@/store/data";
import { Flex } from "../layouts/Flex";
import styled from "styled-components";
import { colors } from "@/js/theme";
import { Container } from "../layouts/Container";
import { getData, getDataLoggedUser } from "@/js/firebase";
import { Label } from "../ui/Label";

export const Preset = () => {
  const update = useConfigurationStore((state) => state.update);
  const [selected, setSelected] = useState(0);
  const [room, setRoom] = useState("");
  const [listRooms, setListRooms] = useState([]);

  const user = useUserConfiguration((store) => store.user);

  useEffect(() => {
    if (user?.uid) {
      getDataLoggedUser(user.uid).then((list) => setListRooms(list));
    }
  }, []);

  return (
    <Container padding={"2rem 0"}>
      <Label
        text={"Your Rooms"}
        size={"1.5rem"}
        weight={500}
        color={colors.charcoal}
        margin={"0 0 0.5rem 0 "}
      />
      <GenerateContainer>
        <InputField
          placeholder="Enter your room id"
          value={room}
          onChange={(ev) => setRoom(ev.target.value)}
        />
        <GenerateButton
          onClick={() => {
            handleNewRoom(room, update, getData);
          }}
        >
          Generate
        </GenerateButton>
      </GenerateContainer>
      <>
        <Flex direction={"column"} gap={"0.5rem"} margin={"0 0 4rem 0"}>
          {listRooms &&
            listRooms.map((id, key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleNewRoom(id, update, getData)}
              >
                {id}
              </button>
            ))}
        </Flex>
      </>
      <Label
        text={"Preset Rooms"}
        size={"1.5rem"}
        weight={500}
        color={colors.charcoal}
        margin={"0 0 0.5rem 0 "}
      />
      <Flex gap={".5rem"} margin={"0 0 2rem 0"}>
        <PresetButton
          onClick={() => {
            handleNewRoom("wCCz3UBJxB5lqnqousUo", update, getData);
            setSelected(0);
          }}
          selected={selected === 0}
        >
          Option 1
        </PresetButton>
        <PresetButton
          onClick={() => {
            handleNewRoom("8Z6cYjUgFUDDcyzZRC9H", update, getData);
            setSelected(1);
          }}
          selected={selected === 1}
        >
          Option 2
        </PresetButton>
        <PresetButton
          onClick={() => {
            handleNewRoom("3dTDJRPmF3U8Ec4nKxLa", update, getData);
            setSelected(2);
          }}
          selected={selected === 2}
        >
          Option 3
        </PresetButton>
      </Flex>
    </Container>
  );
};

const GenerateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const InputField = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: 4rem;
  border-radius: 3px;
  font-size: 1.2rem;
  padding: 0 1rem;
  width: 70%;
`;

const GenerateButton = styled.button`
  height: 4rem;
  width: 30%;
  text-align: center;
  background-color: #fff;
  color: ${colors.charcoal};
  padding: 0 1.5rem;
  font-size: 1.3rem;
  border-radius: 3px;
  outline: 1px solid rgba(0, 0, 0, 0.2);
`;

const PresetButton = styled.button`
  padding: 1rem 0;
  flex: 1;
  text-align: center;
  border-radius: 5px;
  font-size: 1.3rem;
  color: ${colors.charcoal};
  background-color: ${(props) => (props.selected ? "#fff" : colors.lightCreme)};
  transition: transform 0.3s ease-out;
  outline: 1px solid
    ${(props) => (props.selected ? "rgba(0, 0, 0, 0.2)" : "transparant")};
`;
