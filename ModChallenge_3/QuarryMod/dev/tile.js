TileEntity.registerPrototype(BlockID.quarry, {
    defaultValues: {
        // Количество энергии в TE
        energy: 0,
        // Количество опыта
        exp: 0,
        // Модификатор радиуса копания
        territoryModifier: 1,
        //Координаты, на который копает карьер
        digY: 0,
        digX: 0,
        digZ: 0,
        // Карьер завершил свою работы?
        complete: false,
        // Включён белый список?
        whitelist: false,
        // Если true в tick произойдёт обновление состояния переключателя
        stateFlag: false
    },

    created: function () {
        this.data.digY = this.y - 3;
        this.data.digX = this.x - 16 * this.data.territoryModifier;
        this.data.digZ = this.z - 16 * this.data.territoryModifier;
    },

    getGuiScreen: function () {
        this.data.stateFlag = true;
        return gui;
    },

    /**
     * Добавление дропа в буффер
     * @param items
     */
    addItemToStorage: function (items) {

        for(let index in items) {
            let item = items[index];

            if(this.smelt){
                let smelted = Recipes.getFurnaceRecipeResult(item[0], item[2]);

                if(smelted)
                    item = [smelted.id, item[1], smelted.data];
            }

            for (let i = 0; i < 15; i++) {
                let slot = this.container.getSlot("slot" + i);

                if (!slot.id) {

                    slot.id = item[0];
                    slot.count = item[1];
                    slot.data = item[2];
                    break;

                } else if (slot.id === item[0] && slot.data === item[2] && Item.getMaxStack(slot.id) - slot.count !== 0) {
                    let count = Math.min(Item.getMaxStack(slot.id) - slot.count, item[1]);
                    slot.count += count;

                    if (count < item[1]) {
                        this.addItemToStorage([item[0], item[1] - count, item[2]]);
                    }
                    break;
                }
            }
        }

    },

    /**
     * Применение модификаторов апгрейдов и линз
     */
    upgrades: function () {
        this.data.territoryModifier = 1;
        this.smelt = false;

        for(let i=0;i<2;i++){
            let slot = this.container.getSlot("slotUpgrade"+i);

            if(slot.id === ItemID.quarryUpgradeTerritory){
                this.data.territoryModifier *= 2;
            }
        }

        for(let i=0;i<2;i++){
            let slot = this.container.getSlot("slotLens"+i);

            if(slot.id === ItemID.quarryLensSmelt){
                this.smelt = true;
            }
        }
    },

    /**
     * @param slotTool
     * @returns boolean Истина если предметом slotTool можно добывать блоки с материалом stone
     */
    isCorrectTool: function (slotTool) {
        let toolData = ToolAPI.getToolData(slotTool.id);
        return toolData && toolData.blockMaterials && toolData.blockMaterials["stone"];
    },

    /**
     * Тратим прочность инструмента
     * @param slotTool
     */
    damageTool: function (slotTool) {
        slotTool.data++;
        if(slotTool.data >= Item.getMaxDamage(slotTool.id)){
            slotTool.id = 0;
            slotTool.data = 0;
            slotTool.count = 0;
        }
    },

    /**
     * Проверка валидности структуры
     * @returns {boolean}
     */
    isValidStructure: function () {
        for(let index in directions){
            let dir = directions[index];

            if(World.getBlockID(this.x + dir[0], this.y + dir[1], this.z + dir[2]) !== BlockID.quarryCasing)
                return false;

        }

        return true;
    },

    /**
     * Обновление списка блоков в Белом/Черном списке
     */
    refreshList: function () {
        this.list = {};
        for(let i = 0;i < 6;i++){
            let slot = this.container.getSlot("slotList"+i);

            if(slot.id)
                this.list[slot.id + ":" + slot.data] = true;
        }
    },

    tick: function(){
        let slotTool = this.container.getSlot("slotTool");
        let content = this.container.getGuiContent();

        if(this.data.stateFlag) {
            this.container.setBinding("switch", "state", this.data.whitelist);
        }

        this.refreshList();

        if(!this.isValidStructure()) {

            if(content)
                content.elements["text"].text = "Incorrect structure";

        }else {
            let correctTool = this.isCorrectTool(slotTool);
            if(slotTool.id && !correctTool) {

                if(content)
                    content.elements["text"].text = "Incorrect tool";

            }else {
                if (content)
                    content.elements["text"].text = "X:" + this.data.digX + " Y:" + this.data.digY + " Z:" + this.data.digZ;

                if (this.data.energy >= 70 && World.getThreadTime() % 5 === 0 && !this.data.complete) {

                    this.upgrades();

                    let range = 16 * this.data.territoryModifier;
                    this.data.energy -= ENERGY_PER_SCAN;

                    if (++this.data.digX > this.x + range) {

                        this.data.digX = this.x - range;

                        if (++this.data.digZ > this.z + range) {

                            this.data.digZ = this.z - range;
                            this.data.digX = this.x - range;

                            if (--this.data.digY < 1) {
                                this.data.complete = true;
                            }

                        }

                    }
                    let block = World.getBlock(this.data.digX, this.data.digY, this.data.digZ);
                    if (block.id > 0) {
                        let blockData = ToolAPI.blockData[block.id];

                        if (blockData && blockData.material.name === "stone" && ((this.data.whitelist && this.list[block.id + ":" + block.data]) || (!this.data.whitelist && !this.list[block.id + ":" + block.data]))) {
                                 let drop = Block.getBlockDropViaItem(block, {
                                    id: slotTool.id || 278,
                                    data: slotTool.data
                                }, {x: this.data.digX, y: this.data.digY, z: this.data.digZ});
                            // }else{
                            //     let block = World.getBlock(this.data.digX, this.data.digY, this.data.digZ);
                            //     let dropFunc = Block.getDropFunction (block.id);
                            //
                            //     alert(this.silkTouch);
                            //     let drop = dropFunc({x: this.data.digX, y: this.data.digY, z: this.data.digZ}, block.id, block.data, correctTool ? ToolAPI.getToolLevel (slotTool.id) : 0, ToolAPI.getToolLevel (slotTool.id), {silk: this.silkTouch});
                           // }

                            if (correctTool)
                                this.damageTool(slotTool);
                            else this.data.energy -= ENERGY_PER_DESTROY;

                            if (drop)
                                this.addItemToStorage(drop);

                            World.setBlock(this.data.digX, this.data.digY, this.data.digZ, 3);

                            let exp_orbs = Entity.getAllInRange({x: this.data.digX, y: this.data.digY, z: this.data.digZ}, 2, 69);

                            for(let index in exp_orbs){
                                if(this.data.exp < 1000) {
                                    this.data.exp = Math.min(1000, this.data.exp + 2);

                                    Entity.remove(exp_orbs[index]);
                                }
                            }
                        }
                    }
                }
            }
        }

        if(content) {
            content.elements["textExp"].text = "Exp: " + this.data.exp;
            content.elements["textRange"].text = "Range: " + 16 * this.data.territoryModifier;
        }

        this.container.setScale("energyScale", this.data.energy / 50000);
        this.container.setScale("expScale", this.data.exp / 1000);
    },

    energyTick: function (type, src) {
        this.data.energy += src.get(50000 - this.data.energy);
    }

});

EnergyTileRegistry.addEnergyTypeForId(BlockID.quarry, EU);