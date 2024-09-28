<template>
	<main class="flex items-center justify-center min-h-screen h-full py-10">
		<form
			class="border flex flex-col gap-y-4 rounded-md p-5 max-w-screen-sm mx-auto w-10/12"
		>
			<h3 class="font-bold text-2xl text-center">Simulador de subsidio</h3>
			<small class="text-custom-primary text-center -mt-4">
				Ten en cuenta que esta simulación solo aplica para proyectos
				<strong>VIP</strong> y <strong>VIS</strong>
			</small>

			<div class="flex flex-col gap-y-2">
				<strong>¿Valor del inmueble?</strong>
				<input
					type="number"
					class="w-full"
					@blur="data.price = data.price > MAX_PRICE ? MAX_PRICE : data.price"
					:max="MAX_PRICE"
					v-model="data.price"
				/>
			</div>

			<!-- Grupo de Sisben -->
			<div class="flex flex-col gap-y-2">
				<strong>¿A qué grupo de sisben perteneces?</strong>
				<select v-model="data.sisben">
					<option value="">Selecciona una opción</option>
					<option value="group-1">A1-C8</option>
					<option value="group-2">+C9</option>
					<option value="group-3">No tengo sisben</option>
				</select>
			</div>

			<!-- Salario -->
			<div class="flex flex-col gap-y-2">
				<strong>¿Cuánto ganas?</strong>
				<div class="flex flex-col gap-y-2">
					<label class="flex items-center gap-2">
						<input
							type="radio"
							name="salary"
							value="group-1"
							v-model="data.salary"
						/>
						<span class="text-sm">0 a 2 SMMLV</span>
					</label>
					<label class="flex items-center gap-2">
						<input
							type="radio"
							name="salary"
							value="group-2"
							v-model="data.salary"
						/>
						<span class="text-sm">2 a 4 SMMLV</span>
					</label>
					<label class="flex items-center gap-2">
						<input
							type="radio"
							name="salary"
							value="group-3"
							v-model="data.salary"
						/>
						<span class="text-sm">+4 SMMLV</span>
					</label>
				</div>
			</div>

			<!-- Valor de la Vivienda -->
			<div class="flex flex-col gap-y-2">
				<h4 class="font-bold text-xl">Posible valor de tu vivienda</h4>
				<h3 class="font-bold text-2xl">{{ formatCurrency(newValue) }}</h3>
			</div>

			<!-- Subsidios Aplicables -->
			<div class="flex flex-col gap-y-2">
				<h5 class="font-bold">Aplican los subsidios de:</h5>
				<ul class="list-disc flex flex-col pl-6">
					<li class="text-sm" v-if="miCasaYa > 0 && concurrencia === 0">
						<strong>Mi casa ya:</strong> {{ formatCurrency(miCasaYa) }} o
						{{ getSmmlv(miCasaYa) }} SMMLV
					</li>
					<li class="text-sm" v-if="cajaDeCompensacion > 0">
						<strong>Caja de compensación:</strong>
						{{ formatCurrency(cajaDeCompensacion) }} o
						{{ getSmmlv(cajaDeCompensacion) }} SMMLV
					</li>
					<li class="text-sm" v-if="concurrencia > 0">
						<strong>Concurrencia:</strong> {{ formatCurrency(concurrencia) }} o
						{{ getSmmlv(concurrencia) }} SMMLV
					</li>
					<li v-if="totalDiscount === 0">
						<strong>No hay ningún descuento</strong>
					</li>
				</ul>
			</div>

			<!-- Nota Informativa -->
			<p class="text-xs text-custom-primary font-light">
				Es importante que estos valores sean revisados y confirmados por tu
				constructora para asegurar que los subsidios mencionados sean
				aplicables. Ten en cuenta que no todas las constructoras gestionan o
				aplican todos los subsidios disponibles y que el valor del descuento
				puede cambiar.
			</p>
		</form>
	</main>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { SMMLV_MOCK, SUBSIDIES_MOCK } from "@/constants/mocks";
import { formatCurrency } from "@/helpers/format";

const MAX_PRICE = 200000000;

const data = ref({
	price: 0,
	salary: "",
	sisben: "",
});

const miCasaYa = computed(() => {
	if (data.value.sisben === "group-1") {
		return SUBSIDIES_MOCK.miCasaYa.group1 * SMMLV_MOCK;
	}
	if (data.value.sisben === "group-2") {
		return SUBSIDIES_MOCK.miCasaYa.group2 * SMMLV_MOCK;
	}
	return 0;
});

const cajaDeCompensacion = computed(() => {
	if (
		data.value.salary === "group-1" &&
		(data.value.sisben === "group-3" || data.value.sisben === "")
	) {
		return SUBSIDIES_MOCK.cajaDeCompensacion.group1 * SMMLV_MOCK;
	}
	if (
		data.value.salary === "group-2" &&
		(data.value.sisben === "group-3" || data.value.sisben === "")
	) {
		return SUBSIDIES_MOCK.cajaDeCompensacion.group2 * SMMLV_MOCK;
	}
	return 0;
});

const concurrencia = computed(() => {
	if (data.value.salary === "group-1" && data.value.sisben === "group-1") {
		return SUBSIDIES_MOCK.concurrencia.group1 * SMMLV_MOCK;
	}
	return 0;
});

const totalDiscount = computed(() => {
	return miCasaYa.value + cajaDeCompensacion.value + concurrencia.value;
});

const newValue = computed(() => {
	return totalDiscount.value > data.value.price
		? 0
		: data.value.price - totalDiscount.value;
});

const getSmmlv = (value: number) => {
	return (value / SMMLV_MOCK).toFixed(0);
};
</script>
